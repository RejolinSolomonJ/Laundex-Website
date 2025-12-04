import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 font-sans">
            {/* Navbar */}
            <nav className="container mx-auto p-6 flex justify-between items-center z-20 relative">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">QuickWash Pro</div>
                <div className="flex items-center gap-6">
                    <button onClick={toggleTheme} className="text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <Link to="/login" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">Login</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-105">Sign Up</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-12 md:mb-0 z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                        Laundry & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dry Cleaning,</span> <br />
                        Delivered.
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                        Schedule a pickup in seconds. We collect, clean, and deliver your laundry fresh and folded in 24 hours.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-xl transform hover:scale-105">
                            Schedule Pickup
                        </Link>
                        <Link to="/login" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-md">
                            How it Works
                        </Link>
                    </div>
                </div>

                <div className="md:w-1/2 relative">
                    {/* Abstract Shapes/Blobs for "Premium" feel without images */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 right-20 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

                    <div className="relative z-10 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                        {/* Mock UI Card */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">✓</div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white">Order Completed</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Your laundry is on the way!</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <div className="text-sm font-bold text-gray-500 dark:text-gray-400">Total</div>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">₹350.00</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose QuickWash Pro?</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We bring the dry cleaner to your door, so you can spend your time doing what you love.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Convenient Pickup', desc: 'Book a slot, and our valet will collect your bags from your doorstep.', icon: '🚚' },
                            { title: 'Expert Cleaning', desc: 'Your clothes are cleaned in our top-notch facilities with eco-friendly products.', icon: '✨' },
                            { title: 'Fast Delivery', desc: 'Get your fresh, folded clothes back in as little as 24 hours.', icon: '⚡' }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700">
                                <div className="text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-blue-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Ditch Laundry Day?</h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of happy customers who have reclaimed their weekends.</p>
                            <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
                                Get Started Now
                            </Link>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="text-2xl font-bold text-white mb-2">QuickWash Pro</div>
                        <p>© 2025 QuickWash Pro. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
