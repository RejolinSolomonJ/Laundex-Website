import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import NotificationContext from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import API_URL from '../config';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'user',
        address: ''
    });
    const [countryCode, setCountryCode] = useState('+91');
    const { isAuthenticated } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { name, email, password, phone, role, address } = formData;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/user');
        }
    }, [isAuthenticated, navigate]);

    const { addNotification } = useContext(NotificationContext);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const fullPhone = `${countryCode}${phone}`;
            const res = await axios.post(`${API_URL}/api/auth/register`, { ...formData, phone: fullPhone });
            navigate('/login');
            // alert('Registration Successful! Please Login.');
            addNotification('Registration Successful! Please Login.', 'success');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.msg || err.message || 'Registration Failed';
            setError(msg);
            // alert('Registration Error: ' + msg);
            addNotification('Registration Error: ' + msg, 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden py-12">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-10 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 border border-white/20 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 dark:from-green-400 dark:to-blue-400">Create Account</h2>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
                        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                    </button>
                </div>

                {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 mb-4 rounded-lg text-sm font-medium">{error}</div>}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Full Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" required />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be 8+ chars, with 1 number & 1 special char.</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Phone</label>
                        <div className="flex gap-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="px-2 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            >
                                <option value="+91">+91 (IN)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+61">+61 (AU)</option>
                            </select>
                            <input type="text" name="phone" value={phone} onChange={onChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Role</label>
                        <select name="role" value={role} onChange={onChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white">
                            <option value="user">User</option>
                            <option value="worker">Worker</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Address</label>
                        <input type="text" name="address" value={address} onChange={onChange} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-300 shadow-lg mt-4">
                        Create Account
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
