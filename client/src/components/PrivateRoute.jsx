import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, loading, user } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard if role doesn't match
        if (user.role === 'admin') return <Navigate to="/admin" />;
        if (user.role === 'worker') return <Navigate to="/worker" />;
        return <Navigate to="/user" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
