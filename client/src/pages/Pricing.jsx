import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Sun, Moon, Check } from 'lucide-react';

const Pricing = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-deep-900 transition-colors duration-300 font-sans">
            {/* Navbar */}
            <nav className="container mx-auto p-6 flex justify-between items-center z-50 relative">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-pink rounded-lg flex items-center justify-center text-white font-bold text-lg">Q</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Laundex</div>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-8 bg-white/50 dark:bg-deep-800/50 backdrop-blur-md px-8 py-3 rounded-full border border-gray-200 dark:border-deep-700 shadow-sm">
                    {['About', 'Services', 'Pricing', 'Contact'].map((item) => (
                        <Link key={item} to={`/${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-purple dark:hover:text-white transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-deep-800 text-gray-600 dark:text-gray-300 transition">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to="/login" className="hidden md:block font-medium text-gray-700 dark:text-white hover:text-brand-purple transition">Login</Link>
                    <Link to="/register" className="bg-gray-900 dark:bg-white text-white dark:text-deep-900 px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-lg transform hover:scale-105">
                        Launch App
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Simple Pricing</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16">
                    Transparent pricing with no hidden fees. Choose the plan that works for you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { title: 'Pay As You Go', price: '₹60', unit: '/kg', features: ['Wash & Fold', '48h Delivery', 'Standard Detergent', 'No Minimum Order'] },
                        { title: 'Premium', price: '₹90', unit: '/kg', features: ['Wash & Fold + Iron', '24h Delivery', 'Premium Detergent', 'Free Pickup & Drop'], highlight: true },
                        { title: 'Dry Cleaning', price: '₹200', unit: '/item', features: ['Expert Stain Removal', '3-Day Delivery', 'Hanger Service', 'Garment Bag Included'] }
                    ].map((plan, idx) => (
                        <div key={idx} className={`relative bg-white dark:bg-deep-800 p-8 rounded-3xl shadow-lg border ${plan.highlight ? 'border-brand-purple ring-2 ring-brand-purple/50' : 'border-gray-100 dark:border-deep-700'} flex flex-col`}>
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-purple text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">{plan.unit}</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                        <span className="text-green-500 font-bold"><Check size={20} /></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/register" className={`w-full py-4 rounded-xl font-bold text-center transition ${plan.highlight ? 'bg-brand-purple text-white hover:bg-brand-purple/90' : 'bg-gray-100 dark:bg-deep-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-deep-600'}`}>
                                Choose Plan
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
