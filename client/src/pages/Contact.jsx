import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Sun, Moon, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
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
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Get in Touch</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white dark:bg-deep-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-deep-700">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-deep-900 border border-gray-200 dark:border-deep-700 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition dark:text-white" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-deep-900 border border-gray-200 dark:border-deep-700 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition dark:text-white" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-deep-900 border border-gray-200 dark:border-deep-700 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition dark:text-white" placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-primary/90 transition shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-col justify-center space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl"><MapPin size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Visit Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Mevalurkuppam <br />Chennai , Tamilnadu , India </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl"><Phone size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Call Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">+91 8667327886</p>
                                    <p className="text-gray-600 dark:text-gray-400">+91 7548855208</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl"><Mail size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">support@quickwashpro.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
