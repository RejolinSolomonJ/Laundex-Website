import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-deep-900 transition-colors duration-300 font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="container mx-auto p-6 flex justify-between items-center z-50 relative">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">Q</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">QuickWash <span className="text-brand-primary">Pro</span></div>
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
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <Link to="/login" className="hidden md:block font-medium text-gray-700 dark:text-white hover:text-brand-primary transition">Login</Link>
                    <Link to="/register" className="bg-gray-900 dark:bg-white text-white dark:text-deep-900 px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-lg transform hover:scale-105">
                        Launch App
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32 relative">
                <div className="flex flex-col items-center text-center z-10 relative max-w-4xl mx-auto animate-fade-in-up">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 text-brand-primary dark:text-brand-primary font-semibold text-sm tracking-wide uppercase">
                        Premium Laundry Service
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-8 tracking-tight">
                        Unlock the Potential of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary py-2 inline-block">Effortless Laundry</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        The easiest and most secure way to manage your laundry needs.
                        Schedule pickups, track orders, and get fresh clothes delivered to your door.
                    </p>

                    {/* Search/Action Bar */}
                    <div className="w-full max-w-2xl bg-white dark:bg-deep-800 p-2 rounded-2xl shadow-2xl border border-gray-100 dark:border-deep-700 flex flex-col md:flex-row gap-2 mb-16">
                        <input
                            type="text"
                            placeholder="Enter your zip code"
                            className="flex-1 bg-transparent px-6 py-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
                        />
                        <div className="flex gap-2">
                            <select className="bg-gray-50 dark:bg-deep-900 text-gray-900 dark:text-white px-4 py-2 rounded-xl border-none focus:ring-0 font-medium cursor-pointer">
                                <option className="text-gray-900 bg-white">Wash & Fold</option>
                                <option className="text-gray-900 bg-white">Dry Clean</option>
                            </select>
                            <Link to="/register" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center min-w-[140px]">
                                Book Now
                            </Link>
                        </div>
                    </div>

                    {/* Powered By */}
                    <div className="flex flex-col items-center gap-4 opacity-70">
                        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Trusted By</span>
                        <div className="flex gap-8 grayscale opacity-60 dark:opacity-80 dark:invert">
                            {/* Simple text placeholders for logos to keep it clean */}
                            <span className="font-bold text-xl text-gray-600 dark:text-white">Airbnb</span>
                            <span className="font-bold text-xl text-gray-600 dark:text-white">Uber</span>
                            <span className="font-bold text-xl text-gray-600 dark:text-white">WeWork</span>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                </div>

                {/* 3D Elements (CSS only representations) */}
                <div className="hidden md:block absolute top-20 left-10 animate-float">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 shadow-2xl transform rotate-12 flex items-center justify-center">
                        <span className="text-4xl">👕</span>
                    </div>
                </div>
                <div className="hidden md:block absolute bottom-40 right-10 animate-float animation-delay-4000">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary shadow-2xl flex items-center justify-center">
                        <span className="text-3xl text-white">✨</span>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50 dark:bg-deep-900/50 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Smart Scheduling', desc: 'Pick a time that works for you.', icon: '📅', color: 'from-blue-400 to-blue-600' },
                            { title: 'Eco Cleaning', desc: 'Sustainable practices for a better planet.', icon: '🌱', color: 'from-green-400 to-green-600' },
                            { title: 'Express Delivery', desc: 'Back to you in 24 hours.', icon: '🚀', color: 'from-orange-400 to-orange-600' }
                        ].map((feature, idx) => (
                            <div key={idx} className="group relative bg-white dark:bg-deep-800 p-1 rounded-3xl hover:bg-gradient-to-br hover:from-brand-primary hover:to-brand-secondary transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="bg-white dark:bg-deep-800 p-8 rounded-[22px] h-full relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-deep-900 border-t border-gray-100 dark:border-deep-800 py-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">QuickWash <span className="text-brand-primary">Pro</span></div>
                        <p className="text-gray-500 dark:text-gray-400">© 2025 QuickWash Pro. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition">Privacy</a>
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition">Terms</a>
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
