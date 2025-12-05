import React from 'react';
import StatsCards from './StatsCards';

const AdminOverview = ({ stats, orders, setActiveTab }) => {
    // Get top 5 recent orders
    const recentOrders = orders.slice(0, 5);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Dashboard Overview</h2>
                <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Summary Cards */}
            <StatsCards stats={stats} />

            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h3>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        View All Orders
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-600">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                                <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {recentOrders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="p-4 font-mono text-xs text-gray-500 dark:text-gray-400">#{order._id.substring(0, 8)}</td>
                                    <td className="p-4 text-sm text-gray-800 dark:text-white font-medium">{order.user?.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-800 dark:text-white font-bold">₹{order.totalAmount}</td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
