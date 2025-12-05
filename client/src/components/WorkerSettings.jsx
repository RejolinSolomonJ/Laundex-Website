import React, { useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';
import { User, Moon, Sun, Bell, Shield, Mail, Phone, MapPin } from 'lucide-react';

const WorkerSettings = () => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h2>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <User className="text-blue-500" /> Profile Information
                    </h3>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-600">
                                    {user?.name}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Role</label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-600 capitalize">
                                    {user?.role}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                                    <Mail size={16} className="text-gray-400" /> {user?.email}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" /> {user?.phone || 'Not provided'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <Shield className="text-purple-500" /> Preferences
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                    {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white">Appearance</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                            >
                                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white">Notifications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your email and push notifications</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerSettings;
