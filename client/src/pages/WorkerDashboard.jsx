import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import WorkerSidebar from '../components/WorkerSidebar';
import WorkerOverview from '../components/WorkerOverview';
import WorkerOrders from '../components/WorkerOrders';
import WorkerSettings from '../components/WorkerSettings';
import { Menu, Moon, Sun, LogOut } from 'lucide-react';

const WorkerDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex transition-colors duration-300">
            {/* Sidebar */}
            <WorkerSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                logout={logout}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* Main Content */}
            <div className="flex-1 ml-0 md:ml-64 transition-all duration-300">
                {/* Mobile Header */}
                <header className="md:hidden bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 hover:text-white">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-bold text-white">Laundex Worker</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>
                </header>

                <main className="p-4 md:p-8">
                    {activeTab === 'overview' && <WorkerOverview user={user} setActiveTab={setActiveTab} />}
                    {activeTab === 'orders' && <WorkerOrders />}
                    {activeTab === 'settings' && <WorkerSettings />}
                </main>
            </div>
        </div>
    );
};

export default WorkerDashboard;
