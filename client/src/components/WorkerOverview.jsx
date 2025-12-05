import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Search, MapPin, Phone, ArrowRight, MoreVertical, Flame, TrendingUp, Calendar, CheckCircle, AlertCircle, Clock, Package } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

const WorkerOverview = ({ user, setActiveTab }) => {
    const [stats, setStats] = useState({
        activeGoals: 0,
        progress: 0,
        completedTasks: 0,
        dueTasks: 0
    });
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            const res = await axios.get('http://localhost:5002/api/orders/assigned', config);
            const orders = res.data;

            // Calculate Stats
            const completed = orders.filter(o => o.status === 'delivered').length;
            const active = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;
            const due = orders.filter(o => ['pending', 'pickup_assigned'].includes(o.status)).length;
            const total = orders.length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            setStats({
                activeGoals: active,
                progress: progress,
                completedTasks: completed,
                dueTasks: due
            });

            // Get Upcoming Tasks (Pending/In Progress)
            const tasks = orders
                .filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
                .slice(0, 3)
                .map((o, index) => ({
                    id: index + 1,
                    title: `${o.service?.name} - ${o.user?.name}`,
                    progress: o.status === 'pending' ? 10 : o.status === 'washing' ? 50 : o.status === 'ready_for_delivery' ? 90 : 30,
                    deadline: new Date(o.pickupDate).toLocaleDateString(),
                    status: o.status
                }));

            setUpcomingTasks(tasks);

            // Calculate Weekly Performance (Last 7 Days)
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            const last7Days = [];

            for (let i = 6; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                last7Days.push({
                    name: days[d.getDay()],
                    date: d.toISOString().split('T')[0],
                    value: 0
                });
            }

            orders.forEach(order => {
                if (order.status === 'delivered' && order.deliveryDate) {
                    const deliveryDate = new Date(order.deliveryDate).toISOString().split('T')[0];
                    const dayStat = last7Days.find(d => d.date === deliveryDate);
                    if (dayStat) {
                        dayStat.value += 1;
                    }
                }
            });

            setPerformanceData(last7Days);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const scoreData = [
        { name: 'Score', value: stats.progress || 70 },
        { name: 'Remaining', value: 100 - (stats.progress || 70) },
    ];
    const COLORS = ['#6366f1', '#1f2937'];

    if (loading) return <div className="p-8 text-center text-white">Loading Dashboard...</div>;

    return (
        <div className="p-6 animate-fade-in-up text-white max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <span className="p-2 bg-yellow-500/20 rounded-xl text-yellow-400"><Flame size={24} fill="currentColor" /></span>
                        Good Morning, {user?.name?.split(' ')[0]}
                    </h1>
                    <p className="text-gray-400 text-sm mt-1 ml-14">Here's what's happening with your tasks today.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition"
                        />
                    </div>
                    <div className="relative p-2 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition cursor-pointer">
                        <Bell size={20} className="text-gray-400 hover:text-white" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-800"></span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Card */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden border border-gray-700 shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-indigo-900/50 flex items-center gap-2"
                            >
                                Resume Work <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-800"></div>
                        </div>

                        <div className="text-center md:text-left z-10">
                            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                            <p className="text-indigo-400 font-medium mb-4 capitalize">{user?.role || 'Worker'}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-700">
                                    <Phone size={14} /> {user?.phone || '+1 234 567 890'}
                                </div>
                                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-700">
                                    <MapPin size={14} /> New York, USA
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Goals', value: stats.activeGoals, icon: <Package size={24} />, color: 'text-blue-400' },
                            { label: 'Progress', value: `${stats.progress}%`, icon: <TrendingUp size={24} />, color: 'text-green-400' },
                            { label: 'Completed', value: stats.completedTasks, icon: <CheckCircle size={24} />, color: 'text-purple-400' },
                            { label: 'Due Tasks', value: stats.dueTasks, icon: <AlertCircle size={24} />, color: 'text-orange-400' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 hover:border-gray-600 transition group hover:-translate-y-1 duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`${stat.color}`}>{stat.icon}</span>
                                    <div className="bg-gray-700/50 p-1.5 rounded-lg group-hover:bg-gray-700 transition">
                                        <ArrowRight size={12} className="text-gray-400 group-hover:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <span className={`text-2xl font-bold block ${stat.color}`}>{stat.value}</span>
                                    <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Tasks List */}
                    <div className="bg-gray-800/30 rounded-[2rem] p-6 border border-gray-700/50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                <Calendar size={20} className="text-indigo-400" />
                                Upcoming Tasks
                            </h3>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {upcomingTasks.length > 0 ? upcomingTasks.map(task => (
                                <div key={task.id} className="bg-gray-800 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-750 border border-gray-700/50 hover:border-indigo-500/30 transition group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-700/50 flex items-center justify-center text-gray-400 font-bold text-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition">
                                            {task.id}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-200 group-hover:text-white transition">{task.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-500 uppercase">{task.status.replace(/_/g, ' ')}</span>
                                                <span className="text-xs text-orange-400 font-medium bg-orange-400/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                    <Clock size={10} /> {task.deadline}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden sm:block">
                                            <span className="text-xs text-gray-400">Progress</span>
                                            <p className="font-bold text-indigo-400">{task.progress}%</p>
                                        </div>
                                        <div className="w-12 h-12 relative flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="24" cy="24" r="18" stroke="#374151" strokeWidth="4" fill="transparent" />
                                                <circle cx="24" cy="24" r="18" stroke="#6366f1" strokeWidth="4" fill="transparent" strokeDasharray="113" strokeDashoffset={113 - (113 * task.progress) / 100} strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-gray-500">No upcoming tasks</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column (Charts) */}
                <div className="space-y-8">
                    {/* Score Gauge */}
                    <div className="bg-gray-800 rounded-[2rem] p-8 flex flex-col items-center justify-center relative border border-gray-700 shadow-xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        <div className="flex justify-between w-full mb-4">
                            <h3 className="font-bold text-gray-300">Efficiency Score</h3>
                            <MoreVertical size={20} className="text-gray-500 cursor-pointer" />
                        </div>

                        <div className="w-48 h-48 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={scoreData}
                                        cx="50%"
                                        cy="50%"
                                        startAngle={180}
                                        endAngle={0}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={10}
                                    >
                                        {scoreData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
                                <span className="text-4xl font-bold block text-white">{stats.progress}%</span>
                                <span className="text-gray-400 text-xs uppercase tracking-wider">Completion Rate</span>
                            </div>
                        </div>
                        <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full flex items-center gap-2 mt-2">
                            <span className="text-indigo-400">🔥</span>
                            <span className="text-xs font-bold text-indigo-300">Keep it up!</span>
                        </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="bg-gray-800 rounded-[2rem] p-6 border border-gray-700 shadow-xl h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-lg">Statistics</h3>
                                <p className="text-xs text-gray-400">Weekly Performance</p>
                            </div>
                            <select className="bg-gray-700 text-xs rounded-lg px-3 py-1.5 outline-none border border-gray-600 text-gray-300">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                        itemStyle={{ color: '#e5e7eb' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-700/30 rounded-xl p-3">
                                <p className="text-gray-400 text-[10px] uppercase">Tasks Done</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-white">{stats.completedTasks}</span>
                                    <span className="text-green-400 text-xs font-bold mb-1 flex items-center"><TrendingUp size={10} /> +12%</span>
                                </div>
                            </div>
                            <div className="bg-gray-700/30 rounded-xl p-3">
                                <p className="text-gray-400 text-[10px] uppercase">Efficiency</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-white">94%</span>
                                    <span className="text-green-400 text-xs font-bold mb-1 flex items-center"><TrendingUp size={10} /> +5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerOverview;
