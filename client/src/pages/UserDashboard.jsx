import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import NotificationContext from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import Footer from '../components/Footer';
import {
    Sun, Moon, LogOut, Package, ShoppingBasket, Shirt, Zap, Sparkles,
    Calendar, MapPin, CheckCircle, Search, X, Star, Menu
} from 'lucide-react';
import API_URL from '../config';

const UserDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext);
    const { theme, toggleTheme } = useTheme();
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingData, setBookingData] = useState({
        pickupDate: '',
        address: user?.address || ''
    });
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('services');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const testimonials = [
        { id: 1, name: 'Jane Doe', role: 'Happy Customer', rating: 5, text: 'Laundex has transformed my laundry routine! The service is impeccable, and my clothes always come back fresh and perfectly folded. Highly recommend!', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 2, name: 'John Smith', role: 'Busy Professional', rating: 4, text: 'As a busy professional, I barely have time for laundry. Laundex is a lifesaver. Convenient pickup and delivery, and excellent quality. A bit pricey, but worth it.', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 3, name: 'Emily White', role: 'Student', rating: 5, text: 'Affordable and reliable! I use their service every week. My clothes are always clean, and the staff is super friendly. Best laundry service in town!', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    ];

    const blogs = [
        { id: 1, title: '5 Tips for a Greener Laundry Routine', category: 'Eco-Friendly', date: 'Oct 26, 2023', image: 'https://images.unsplash.com/photo-1626803102220-d14212720932?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, title: 'The Ultimate Guide to Fabric Care Symbols', category: 'Laundry Hacks', date: 'Oct 19, 2023', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, title: 'Why Professional Dry Cleaning is Worth It', category: 'Expert Advice', date: 'Oct 12, 2023', image: 'https://images.unsplash.com/photo-1545670723-ec5241e50a7b?q=80&w=2070&auto=format&fit=crop' },
    ];

    useEffect(() => {
        fetchServices();
        fetchOrders();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/services`);
            setServices(res.data);
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Failed to load services from ${API_URL}. Please check your connection.`);
        }
    };

    const fetchOrders = async () => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            const res = await axios.get(`${API_URL}/api/orders/my-orders`, config);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedService) return addNotification('Please select a service', 'error');
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            const body = {
                serviceId: selectedService._id,
                pickupDate: bookingData.pickupDate,
                address: bookingData.address
            };

            await axios.post(`${API_URL}/api/orders`, body, config);

            addNotification('Order Placed Successfully!', 'success');
            setSelectedService(null);
            fetchOrders();
        } catch (err) {
            console.error(err);
            addNotification('Booking Failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePayment = async (orderId) => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            await axios.post(`${API_URL}/api/orders/${orderId}/pay`, {}, config);
            addNotification('Payment Successful!', 'success');
            fetchOrders();
        } catch (err) {
            console.error(err);
            addNotification('Payment Failed', 'error');
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
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Laundex</h1>
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

                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold text-gray-800 dark:text-white">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button onClick={logout} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 transition" title="Logout">
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-white p-2">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 animate-fade-in px-6 py-4 shadow-lg">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setActiveTab('services'); setIsMenuOpen(false); }}
                                className={`text-left py-2 font-medium transition ${activeTab === 'services' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Services
                            </button>
                            <button
                                onClick={() => { setActiveTab('orders'); setIsMenuOpen(false); }}
                                className={`text-left py-2 font-medium transition ${activeTab === 'orders' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                My Orders
                            </button>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-red-500 font-medium py-2 hover:text-red-600 transition"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <div className="flex-1 container mx-auto px-4 md:px-6 py-8">

                {/* Services Tab */}
                {activeTab === 'services' && (
                    <div className="animate-fade-in-up space-y-12">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex-1 w-full relative">
                                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
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
                                {error && (
                                    <div className="col-span-full text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900">
                                        <p className="text-red-600 dark:text-red-400 font-bold mb-2">{error}</p>
                                        <button
                                            onClick={fetchServices}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}
                                {!error && filteredServices.length === 0 && (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-gray-500 dark:text-gray-400">No services found.</p>
                                    </div>
                                )}
                                {filteredServices.map(service => (
                                    <div key={service._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
                                        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                            <img
                                                src={service.image || "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop"}
                                                alt={service.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop"; }}
                                            />
                                            <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-gray-800 dark:text-white">
                                                {service.category || 'Laundry'}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">{service.name}</h3>
                                                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                                                    <Star size={16} fill="currentColor" /> 4.8
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
                                                    <Star key={i} size={20} fill={i < item.rating ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 italic">"{item.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Blog Section */}
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
                                <div className="text-6xl mb-4 flex justify-center"><Package size={64} className="text-gray-400" /></div>
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
                                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-3xl text-blue-600 dark:text-blue-400">
                                                {order.service?.name.includes('Wash') ? <ShoppingBasket size={32} /> :
                                                    order.service?.name.includes('Dry') ? <Shirt size={32} /> :
                                                        order.service?.name.includes('Iron') ? <Zap size={32} /> : <Sparkles size={32} />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{order.service?.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: #{order._id.substring(0, 8)}</p>
                                                <div className="flex items-center gap-2 mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(order.pickupDate).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><MapPin size={14} /> {order.address}</span>
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
                                                                <CheckCircle size={20} />
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
            <Footer />

            {/* Booking Modal Overlay */}
            {selectedService && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in-up">
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X size={24} />
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
