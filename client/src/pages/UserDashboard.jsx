import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const UserDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingData, setBookingData] = useState({
        pickupDate: '',
        address: user?.address || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };
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
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };

            const body = {
                serviceId: selectedService._id,
                pickupDate: bookingData.pickupDate,
                address: bookingData.address
            };

            await axios.post('http://localhost:5002/api/orders', body, config);
            alert('Order Placed Successfully!');
            setSelectedService(null);
            fetchOrders(); // Refresh orders
        } catch (err) {
            console.error(err);
            alert('Booking Failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePayment = async (orderId) => {
        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            await axios.post(`http://localhost:5002/api/orders/${orderId}/pay`, {}, config);
            alert('Payment Successful!');
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert('Payment Failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">QuickWash Pro</h1>
                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Hello, {user?.name}</span>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </div>
            </nav>

            <div className="container mx-auto p-8">

                {/* Services Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map(service => (
                            <div
                                key={service._id}
                                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md cursor-pointer transition border-2 ${selectedService?._id === service._id ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900' : 'border-transparent hover:shadow-lg dark:border-gray-700'}`}
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 font-bold text-xl">
                                    {service.name[0]}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{service.description}</p>
                                <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">₹{service.price}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Booking Form (Visible when service selected) */}
                {selectedService && (
                    <section className="mb-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-400">Book {selectedService.name}</h2>
                        <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Pickup Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={bookingData.pickupDate}
                                    onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Address</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter pickup address"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={bookingData.address}
                                    onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full text-white font-bold py-3 rounded-lg transition shadow-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isSubmitting ? 'Processing...' : `Confirm Booking (₹${selectedService.price})`}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* Order History */}
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No orders yet.</p>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                    <tr>
                                        <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Service</th>
                                        <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Date</th>
                                        <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Delivery (Est)</th>
                                        <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Status</th>
                                        <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Amount</th>
                                        <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                            <td className="p-4 font-medium text-gray-800 dark:text-white">{order.service?.name}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(order.pickupDate).toLocaleDateString()}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">
                                                {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'Calculating...'}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-gray-800 dark:text-white">₹{order.totalAmount}</td>
                                            <td className="p-4">
                                                {order.paymentStatus === 'paid' ? (
                                                    <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                                                        ✓ Paid
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePayment(order._id)}
                                                        className="bg-green-600 text-white px-4 py-1 rounded text-sm font-bold hover:bg-green-700 transition shadow-sm"
                                                    >
                                                        Pay Now
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
};

export default UserDashboard;
