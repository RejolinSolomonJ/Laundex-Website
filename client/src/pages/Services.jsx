import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Sun, Moon, ShoppingBasket, Shirt, Zap, Footprints, Bed, Blinds } from 'lucide-react';

const Services = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-deep-900 transition-colors duration-300 font-sans">
            {/* Navbar */}
            <nav className="container mx-auto p-6 flex justify-between items-center z-50 relative">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-pink rounded-lg flex items-center justify-center text-white font-bold text-lg">Q</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">QuickWash <span className="text-brand-purple">Pro</span></div>
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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Services</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16">
                    We offer a wide range of laundry and dry cleaning services tailored to your needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Wash & Fold', desc: 'Perfect for your everyday laundry. We wash, dry, and fold your clothes to perfection.', icon: <ShoppingBasket size={48} /> },
                        { title: 'Dry Cleaning', desc: 'Professional care for your delicate garments, suits, and dresses.', icon: <Shirt size={48} /> },
                        { title: 'Ironing', desc: 'Get crisp, wrinkle-free clothes ready to wear.', icon: <Zap size={48} /> },
                        { title: 'Shoe Cleaning', desc: 'Revitalize your footwear with our premium shoe cleaning service.', icon: <Footprints size={48} /> },
                        { title: 'Bedding & Linens', desc: 'Fresh, clean sheets and comforters for a good night\'s sleep.', icon: <Bed size={48} /> },
                        { title: 'Curtain Cleaning', desc: 'Remove dust and allergens from your curtains and drapes.', icon: <Blinds size={48} /> }
                    ].map((service, idx) => (
                        <div key={idx} className="bg-white dark:bg-deep-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-deep-700 group hover:-translate-y-1 duration-300">
                            <div className="text-brand-purple dark:text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
