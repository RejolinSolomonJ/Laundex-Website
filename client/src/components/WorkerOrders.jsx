import { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreHorizontal, Clock, MapPin, Phone, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import API_URL from '../config';

const WorkerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            const res = await axios.get(`${API_URL}/api/orders/assigned`, config);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const config = { headers: { 'x-auth-token': localStorage.getItem('token') } };
            await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus }, config);
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert('Update Failed');
        }
    };

    const columns = [
        { id: 'todo', title: 'To Do', status: ['pending', 'pickup_assigned'], color: 'bg-gray-100 dark:bg-gray-800', border: 'border-gray-300 dark:border-gray-600' },
        { id: 'progress', title: 'In Progress', status: ['picked_up', 'washing', 'drying', 'ironing'], color: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
        { id: 'ready', title: 'Ready', status: ['ready_for_delivery', 'out_for_delivery'], color: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
        { id: 'done', title: 'Completed', status: ['delivered'], color: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' }
    ];

    const getNextStatus = (currentStatus) => {
        const flow = ['pending', 'pickup_assigned', 'picked_up', 'washing', 'drying', 'ironing', 'ready_for_delivery', 'out_for_delivery', 'delivered'];
        const idx = flow.indexOf(currentStatus);
        return idx < flow.length - 1 ? flow[idx + 1] : null;
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Kanban Board...</div>;

    return (
        <div className="h-full flex flex-col animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Order Board</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Drag and drop is simulated via buttons for now.</p>
                </div>
                <button onClick={fetchOrders} className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
                    Refresh Board
                </button>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex flex-col md:flex-row gap-6 min-w-full md:min-w-[1000px] h-full">
                    {columns.map(col => (
                        <div key={col.id} className={`flex-1 min-w-full md:min-w-[300px] rounded-2xl p-4 flex flex-col gap-4 ${col.color} border ${col.border}`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-gray-700 dark:text-gray-200">{col.title}</h3>
                                <span className="bg-white dark:bg-gray-700 px-2 py-1 rounded-md text-xs font-bold text-gray-500 dark:text-gray-300 shadow-sm">
                                    {orders.filter(o => col.status.includes(o.status)).length}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                {orders.filter(o => col.status.includes(o.status)).map(order => (
                                    <div key={order._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition group">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${order.service?.name.includes('Wash') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                                                'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                                }`}>
                                                {order.service?.name}
                                            </span>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>

                                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">{order.user?.name}</h4>
                                        {order.user?.phone && (
                                            <div className="flex items-center gap-1 text-xs text-indigo-500 mb-2">
                                                <Phone size={12} /> {order.user?.phone}
                                            </div>
                                        )}
                                        <div className="space-y-1 mb-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <MapPin size={12} /> <span className="truncate">{order.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <Clock size={12} /> <span>{new Date(order.pickupDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
                                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{order.status.replace(/_/g, ' ')}</span>

                                            {getNextStatus(order.status) && (
                                                <button
                                                    onClick={() => updateStatus(order._id, getNextStatus(order.status))}
                                                    className="flex items-center gap-1 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-lg font-bold hover:opacity-90 transition"
                                                >
                                                    Next <ArrowRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {orders.filter(o => col.status.includes(o.status)).length === 0 && (
                                    <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                        No orders
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkerOrders;
