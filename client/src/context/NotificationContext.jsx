import { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import AuthContext from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5002');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('orderStatusUpdated', (data) => {
            // Notify if I am the user who owns the order
            if (user && user.id === data.user) {
                addNotification(`Your order status updated to: ${data.status}`);
            }
        });

        socket.on('orderAssigned', (data) => {
            // Notify if I am the worker assigned
            if (user && user.id === data.workerId) {
                addNotification(`New Order Assigned!`);
            }
            // Notify user too
            // data.user is just the ID string from adminRoutes emit
            if (user && user.id === data.user) {
                addNotification(`A worker has been assigned to your order!`);
            }
        });

        socket.on('sendSMS', (data) => {
            // In a real app, this event might be consumed by a separate SMS gateway service
            // For now, we'll show it in the console and maybe a special toast to prove it works
            console.log('SMS EVENT RECEIVED:', data);
            if (user && user.phone === data.to) {
                addNotification(`SMS Sent: ${data.message}`);
            }
        });

        return () => {
            socket.off('orderStatusUpdated');
            socket.off('orderAssigned');
            socket.off('sendSMS');
        };
    }, [socket, user]);

    const addNotification = (msg) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, msg }]);
        // Auto remove after 5s
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {notifications.map(n => (
                    <div key={n.id} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
                        {n.msg}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
