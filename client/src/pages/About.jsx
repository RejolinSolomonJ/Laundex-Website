import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Sun, Moon, Rocket, Leaf } from 'lucide-react';

const About = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-deep-900 transition-colors duration-300 font-sans">
            {/* Navbar */}
            <nav className="container mx-auto p-6 flex justify-between items-center z-50 relative">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">Q</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">QuickWash <span className="text-brand-primary">Pro</span></div>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-8 bg-white/50 dark:bg-deep-800/50 backdrop-blur-md px-8 py-3 rounded-full border border-gray-200 dark:border-deep-700 shadow-sm">
                    {['About', 'Services', 'Pricing', 'Contact'].map((item) => (
                        <Link key={item} to={`/${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-deep-800 text-gray-600 dark:text-gray-300 transition">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to="/login" className="hidden md:block font-medium text-gray-700 dark:text-white hover:text-brand-primary transition">Login</Link>
                    <Link to="/register" className="bg-gray-900 dark:bg-white text-white dark:text-deep-900 px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-lg transform hover:scale-105">
                        Launch App
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Us</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16">
                        We are revolutionizing the laundry industry with technology, sustainability, and a customer-first approach.
                    </p>

                    <div className="space-y-16">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="w-full h-64 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-3xl flex items-center justify-center text-brand-primary dark:text-brand-secondary">
                                    <Rocket size={64} />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                    To provide the most convenient, reliable, and eco-friendly laundry service in the world. We believe that your time is valuable, and you shouldn't have to spend it doing laundry.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="w-full h-64 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-3xl flex items-center justify-center text-green-500">
                                    <Leaf size={64} />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sustainability</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                    We care about the planet. That's why we use eco-friendly detergents, energy-efficient machines, and electric vehicles for our delivery fleet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
