import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, BarChart2, LogOut } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, logout }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'orders', label: 'Manage Orders', icon: <ShoppingBag size={20} /> },
        { id: 'users', label: 'Manage Users', icon: <Users size={20} /> },
        { id: 'stats', label: 'Statistics', icon: <BarChart2 size={20} /> },
    ];

    return (
        <div className="w-64 bg-white dark:bg-gray-800 h-screen shadow-lg flex flex-col fixed left-0 top-0 z-20 transition-colors duration-300">
            <div className="p-6 border-b dark:border-gray-700">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">QuickWash Admin</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === item.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t dark:border-gray-700">
                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <span className="text-xl"><LogOut size={20} /></span>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
