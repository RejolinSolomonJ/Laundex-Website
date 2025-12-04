import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const WorkerDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            const res = await axios.get('http://localhost:5002/api/orders/assigned', config);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };
            await axios.put(`http://localhost:5002/api/orders/${orderId}/status`, { status: newStatus }, config);
            fetchOrders(); // Refresh
            alert('Status Updated');
        } catch (err) {
            console.error(err);
            alert('Update Failed');
        }
    };

    const statusOptions = ['pending', 'pickup_assigned', 'picked_up', 'washing', 'drying', 'ironing', 'ready_for_delivery', 'out_for_delivery', 'delivered'];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">QuickWash Pro (Worker)</h1>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <span className="font-medium text-gray-700 dark:text-gray-200 hidden sm:block">Hello, {user?.name}</span>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition shadow-md">Logout</button>
                </div>
            </nav>

            <div className="container mx-auto p-4 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Assigned Orders</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{order.service?.name}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                                <p><span className="font-bold">Customer:</span> {order.user?.name}</p>
                                <p><span className="font-bold">Address:</span> {order.address}</p>
                                <p><span className="font-bold">Phone:</span> {order.user?.phone}</p>
                                <p><span className="font-bold">Pickup:</span> {new Date(order.pickupDate).toLocaleDateString()}</p>
                                <p><span className="font-bold">Due:</span> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Update Status</label>
                                <select
                                    className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                                    value={order.status}
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
