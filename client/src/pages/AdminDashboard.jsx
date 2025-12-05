import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import AdminStats from '../components/AdminStats';
import AdminOverview from '../components/AdminOverview';
import { Sun, Moon, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('overview'); // Default to overview
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };

            const [ordersRes, usersRes, statsRes] = await Promise.all([
                axios.get('http://localhost:5002/api/admin/orders', config),
                axios.get('http://localhost:5002/api/admin/users', config),
                axios.get('http://localhost:5002/api/admin/stats', config)
            ]);

            setOrders(ordersRes.data);
            setUsers(usersRes.data);
            setWorkers(usersRes.data.filter(u => u.role === 'worker'));
            setStats(statsRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex">
            {/* Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Topbar */}
                <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
                        {activeTab === 'stats' ? 'Dashboard Overview' : activeTab.replace('-', ' ')}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button onClick={logout} className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition" title="Logout">
                            <LogOut size={20} />
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l dark:border-gray-700">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 dark:text-white">{user?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                                {user?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {activeTab === 'overview' && <AdminOverview stats={stats} orders={orders} setActiveTab={setActiveTab} />}

                    {activeTab === 'stats' && <AdminStats stats={stats} loading={loading} />}

                    {activeTab === 'orders' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700 animate-fade-in-up">
                            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Orders</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-bold">
                                    {orders.length} Total
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-600">
                                        <tr>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned Worker</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {orders.map(order => (
                                            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                                <td className="p-4 font-mono text-xs text-gray-500 dark:text-gray-400">#{order._id.substring(0, 8)}</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-gray-800 dark:text-white">{order.user?.name}</div>
                                                    <div className="text-xs text-gray-500">{order.address}</div>
                                                </td>
                                                <td className="p-4 text-gray-800 dark:text-white">{order.service?.name}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {order.worker ? (
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xs text-green-600 dark:text-green-400 mr-2">
                                                                {order.worker.name.charAt(0)}
                                                            </div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{order.worker.name}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Unassigned</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <select
                                                        className="p-2 border rounded text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-[150px]"
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
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700 animate-fade-in-up">
                            <div className="p-6 border-b dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">All Users</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-600">
                                        <tr>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold mr-3">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-800 dark:text-white">{u.name}</div>
                                                            <div className="text-xs text-gray-500">{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase 
                                                        ${u.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                                            u.role === 'worker' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{u.phone}</td>
                                                <td className="p-4 text-sm text-gray-500 dark:text-gray-500">
                                                    {new Date().toLocaleDateString()} {/* Placeholder for joined date if not available */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
