import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };

            const ordersRes = await axios.get('http://localhost:5002/api/admin/orders', config);
            setOrders(ordersRes.data);

            const usersRes = await axios.get('http://localhost:5002/api/admin/users', config);
            setUsers(usersRes.data);
            setWorkers(usersRes.data.filter(u => u.role === 'worker'));
        } catch (err) {
            console.error(err);
        }
    };

    const assignWorker = async (orderId, workerId) => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            await axios.put('http://localhost:5002/api/admin/assign', { orderId, workerId }, config);
            alert('Worker Assigned');
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Assignment Failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">QuickWash Pro (Admin)</h1>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <span className="font-medium text-gray-700 dark:text-gray-200 hidden sm:block">Hello, {user?.name}</span>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition shadow-md">Logout</button>
                </div>
            </nav>

            <div className="container mx-auto p-4 md:p-8">
                <div className="flex mb-6 space-x-4">
                    <button
                        className={`px-4 py-2 rounded font-bold transition ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Manage Orders
                    </button>
                    <button
                        className={`px-4 py-2 rounded font-bold transition ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Manage Users
                    </button>
                </div>

                {activeTab === 'orders' && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                    <tr>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">ID</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Customer</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Service</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Status</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Assigned Worker</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                            <td className="p-4 font-mono text-xs text-gray-500 dark:text-gray-400">{order._id.substring(0, 8)}...</td>
                                            <td className="p-4 text-gray-800 dark:text-white">{order.user?.name}</td>
                                            <td className="p-4 text-gray-800 dark:text-white">{order.service?.name}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {order.worker ? (
                                                    <span className="text-green-600 dark:text-green-400 font-bold">{order.worker.name}</span>
                                                ) : (
                                                    <span className="text-red-500 dark:text-red-400">Unassigned</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <select
                                                    className="p-2 border rounded text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                                                    onChange={(e) => assignWorker(order._id, e.target.value)}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Assign Worker</option>
                                                    {workers.map(worker => (
                                                        <option key={worker._id} value={worker._id}>{worker.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                                    <tr>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Name</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Email</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Role</th>
                                        <th className="p-4 text-gray-600 dark:text-gray-300">Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                            <td className="p-4 font-bold text-gray-800 dark:text-white">{u.name}</td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{u.email}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase 
                          ${u.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                                        u.role === 'worker' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600 dark:text-gray-400">{u.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
