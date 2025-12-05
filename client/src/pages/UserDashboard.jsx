import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import Footer from '../components/Footer';

const UserDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('services');
    const [services, setServices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingData, setBookingData] = useState({
        pickupDate: '',
        address: user?.address || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Static Data for UI
    const testimonials = [
        { id: 1, name: "Shane Lee", role: "Satisfied Customer", text: "Running a small business leaves me with little time for household chores. LaundryApp has simplified my laundry routine, allowing me to focus on growing my business.", image: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5 },
        { id: 2, name: "John Doe", role: "Regular User", text: "Excellent service and timely delivery. The dry cleaning quality is top-notch!", image: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
        { id: 3, name: "Emily Chen", role: "Busy Mom", text: "A lifesaver for my family. The pickup and drop-off service is super convenient.", image: "https://randomuser.me/api/portraits/women/68.jpg", rating: 4 },
    ];

    const blogs = [
        { id: 1, title: "Revolutionize Your Laundry Routine", date: "29 Dec, 2023", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb8f?q=80&w=2071&auto=format&fit=crop", category: "Laundry Service" },
        { id: 2, title: "The Power of Convenience", date: "29 Dec, 2023", image: "https://images.unsplash.com/photo-1517677208171-0bc5e2e3b6bd?q=80&w=2070&auto=format&fit=crop", category: "Laundry Service" },
        { id: 3, title: "The Ultimate Laundry Guide", date: "29 Dec, 2023", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop", category: "Tips & Tricks" },
    ];

    useEffect(() => {
        fetchServices();
        fetchOrders();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5002/api/services');
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOrders = async () => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            const res = await axios.get('http://localhost:5002/api/orders/my-orders', config);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedService) return alert('Please select a service');
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            const body = {
                serviceId: selectedService._id,
                pickupDate: bookingData.pickupDate,
                address: bookingData.address
            };

            await axios.post('http://localhost:5002/api/orders', body, config);
            alert('Order Placed Successfully!');
            setSelectedService(null);
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert('Booking Failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePayment = async (orderId) => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            await axios.post(`http://localhost:5002/api/orders/${orderId}/pay`, {}, config);
            alert('Payment Successful!');
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert('Payment Failed');
        }
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans flex flex-col">
            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('services')}>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">QuickWash <span className="text-blue-600">Pro</span></h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`font-medium transition ${activeTab === 'services' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`font-medium transition ${activeTab === 'orders' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
                        >
                            My Orders
                        </button>

                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold text-gray-800 dark:text-white">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
                        </div>
                        <button onClick={logout} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 transition" title="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex-1 container mx-auto px-6 py-8">

                {/* Services Tab */}
                {activeTab === 'services' && (
                    <div className="animate-fade-in-up space-y-12">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex-1 w-full relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for services..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <select
                                    className="w-full p-3 rounded-xl border-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Wash">Washing</option>
                                    <option value="Dryclean">Dry Cleaning</option>
                                    <option value="Iron">Ironing</option>
                                </select>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <section>
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Services</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Discover our premium laundry solutions</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {filteredServices.map(service => (
                                    <div key={service._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
                                        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                            <img
                                                src={service.image || "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop"}
                                                alt={service.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            />
                                            <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-gray-800 dark:text-white">
                                                {service.category || 'Laundry'}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">{service.name}</h3>
                                                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                                                    <span>★</span> 4.8
                                                </div>
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">₹{service.price}<span className="text-gray-400 text-sm font-normal">/pc</span></span>
                                                <button
                                                    onClick={() => setSelectedService(service)}
                                                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition"
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Testimonials */}
                        <section className="bg-blue-50 dark:bg-gray-800/50 -mx-6 px-6 py-16 rounded-3xl">
                            <div className="container mx-auto">
                                <div className="text-center mb-12">
                                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Testimonials</span>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Our Customer <span className="text-blue-600">Feedback</span></h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {testimonials.map(item => (
                                        <div key={item.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center relative">
                                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg -mt-16 mb-6">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                            <p className="text-blue-500 text-sm mb-4">{item.role}</p>
                                            <div className="flex justify-center gap-1 text-amber-400 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>{i < item.rating ? '★' : '☆'}</span>
                                                ))}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 italic">"{item.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Blog Section (Moved from separate tab) */}
                        <section>
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Latest Blog & News</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Tips and tricks for your laundry</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {blogs.map(blog => (
                                    <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
                                        <div className="h-48 overflow-hidden">
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between text-xs font-bold text-blue-500 uppercase tracking-wide mb-3">
                                                <span>{blog.category}</span>
                                                <span>{blog.date}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">{blog.title}</h3>
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">by Admin</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="animate-fade-in-up max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Orders</h2>
                        {orders.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                                <div className="text-6xl mb-4">📦</div>
                                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">No orders yet</p>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Go to Services to book your first laundry!</p>
                                <button
                                    onClick={() => setActiveTab('services')}
                                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition"
                                >
                                    Book Now
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
                                        <div className="flex items-center gap-6 w-full md:w-auto">
                                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-3xl">
                                                {order.service?.name.includes('Wash') ? '🧺' :
                                                    order.service?.name.includes('Dry') ? '👔' :
                                                        order.service?.name.includes('Iron') ? '🔥' : '✨'}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{order.service?.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: #{order._id.substring(0, 8)}</p>
                                                <div className="flex items-center gap-2 mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    <span>📅 {new Date(order.pickupDate).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span>📍 {order.address}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Status</p>
                                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Total</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">₹{order.totalAmount}</p>
                                            </div>

                                            <div>
                                                {order.paymentStatus === 'pending' && order.status !== 'cancelled' ? (
                                                    <button
                                                        onClick={() => handlePayment(order._id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold text-sm transition shadow-lg shadow-green-200 dark:shadow-green-900/20"
                                                    >
                                                        Pay Now
                                                    </button>
                                                ) : (
                                                    <div className="w-24 text-center">
                                                        {order.paymentStatus === 'paid' ? (
                                                            <span className="text-green-600 dark:text-green-400 font-bold flex items-center justify-center gap-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                Paid
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 font-medium text-sm">-</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}



            </div>

            {/* Footer */}
            {/* Footer */}
            <Footer />

            {/* Booking Modal Overlay */}
            {selectedService && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in-up">
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                                {selectedService.name[0]}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book {selectedService.name}</h2>
                            <p className="text-blue-600 font-bold text-xl mt-2">₹{selectedService.price}</p>
                        </div>

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pickup Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={bookingData.pickupDate}
                                    onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pickup Address</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your address"
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={bookingData.address}
                                    onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition transform hover:scale-105 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
