import React from 'react';
import { Package, IndianRupee, Wrench } from 'lucide-react';

const StatsCards = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Jobs</p>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.totalOrders}</h3>
                    </div>
                    <span className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><Package size={24} /></span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">₹{stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <span className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400"><IndianRupee size={24} /></span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Services Used</p>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stats.serviceUsage.length}</h3>
                    </div>
                    <span className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"><Wrench size={24} /></span>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
