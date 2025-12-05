import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import StatsCards from './StatsCards';

const AdminStats = ({ stats, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!stats) return null;

    // Prepare data for the chart
    const data = stats.serviceUsage.map((item, index) => ({
        name: item._id,
        value: item.count,
        color: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'][index % 6]
    }));

    const totalUsage = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Usage Statistics</h2>
                <p className="text-gray-500 dark:text-gray-400">View platform usage statistics and revenue metrics.</p>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Usage Distribution</h3>
                    <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Jobs</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalOrders}</p>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                                {entry.name} ({((entry.value / totalUsage) * 100).toFixed(1)}%)
                            </div>
                        ))}
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Usage by Service</h3>
                    </div>
                    <div className="space-y-4">
                        {data.map((item, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <span className={`px-2 py-1 rounded text-xs font-bold mr-3 text-white`} style={{ backgroundColor: item.color }}>
                                            {item.name}
                                        </span>
                                        <span className="font-medium text-gray-700 dark:text-gray-200">Jobs</span>
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-white">{item.value}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(item.value / totalUsage) * 100}%`, backgroundColor: item.color }}
                                    ></div>
                                </div>
                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                                    {((item.value / totalUsage) * 100).toFixed(1)}% of total usage
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
