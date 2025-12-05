import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';

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


                    {/* Powered By */}
                    <div className="flex flex-col items-center gap-4 opacity-70">
                        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Trusted By</span>
                        <div className="flex gap-8 grayscale opacity-60 dark:opacity-80">
                            {/* Simple text placeholders for logos to keep it clean */}
                            <span className="font-bold text-xl text-gray-600 dark:text-white">Lin's Infotech</span>
                            <span className="font-bold text-xl text-gray-600 dark:text-white">Growzy Academy</span>
                            <span className="font-bold text-xl text-gray-600 dark:text-white">Dev13</span>

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

            {/* Exclusive Benefits Section */}
            <section className="py-24 bg-white dark:bg-deep-900 relative overflow-hidden">
                {/* Background Animations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">Benefits of Laundry App</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                            Exclusive Benefits of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Laundry Service App</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Order Tracking',
                                desc: 'Stay updated with real-time status notifications from pickup to delivery. Know exactly where your clothes are at all times.',
                                icon: '⏱️',
                                color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                            },
                            {
                                title: 'Secure Payments',
                                desc: 'Experience safe and seamless transactions with our multiple secure payment options including credit cards and digital wallets.',
                                icon: '💳',
                                color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600'
                            },
                            {
                                title: '24x7 Support',
                                desc: 'Our dedicated customer support team is always available to assist you with any queries or concerns you may have.',
                                icon: '🎧',
                                color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600'
                            }
                        ].map((benefit, idx) => (
                            <div key={idx} className="group relative bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className={`w-20 h-20 mx-auto rounded-2xl ${benefit.color} flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition duration-300 relative z-10`}>
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{benefit.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gray-50 dark:bg-deep-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">How It Works</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                            How It Works: A Step-<br />by-Step Guide
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Left Side Image */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute inset-0 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
                            <div className="relative z-10 bg-white dark:bg-deep-900 rounded-full p-8 shadow-2xl border-8 border-white dark:border-deep-800 max-w-md mx-auto">
                                <img
                                    src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Laundry Service"
                                    className="w-full h-full object-cover rounded-full aspect-square"
                                />
                                {/* Floating Icons */}
                                <div className="absolute top-0 right-0 bg-white dark:bg-deep-800 p-3 rounded-full shadow-lg animate-bounce">
                                    👕
                                </div>
                                <div className="absolute bottom-10 left-0 bg-white dark:bg-deep-800 p-3 rounded-full shadow-lg animate-bounce animation-delay-2000">
                                    🧼
                                </div>
                            </div>
                        </div>

                        {/* Right Side Steps */}
                        <div className="w-full md:w-1/2 space-y-8">
                            {[
                                { title: 'Sign Up', desc: 'Create an account in seconds using your email or phone number.', icon: '👤' },
                                { title: 'Browse Laundry Services', desc: 'Choose from a variety of services like Wash & Fold, Dry Clean, or Ironing.', icon: '🔍' },
                                { title: 'Complete Payment', desc: 'Pay securely online or choose cash on delivery.', icon: '💳' },
                                { title: 'Your Booking is Confirmed!', desc: 'Sit back and relax. We will handle the rest.', icon: '✅' }
                            ].map((step, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-deep-900 shadow-md flex items-center justify-center text-xl group-hover:bg-brand-primary group-hover:text-white transition duration-300">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-primary transition">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section (Dark Theme) */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">Best Features</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2">
                            Key Features of <br />
                            Our Laundry App
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center hover:border-brand-primary transition duration-300 group">
                            <div className="h-64 bg-gray-700 rounded-2xl mb-6 overflow-hidden relative">
                                {/* Mockup Content */}
                                <div className="absolute inset-2 bg-white rounded-xl overflow-hidden">
                                    <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                                        <span className="text-4xl mb-2">📍</span>
                                        <span className="text-xs font-bold">Map View</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Explore Nearby Services</h3>
                            <p className="text-gray-400 text-sm">Find the best laundry services near your location with ease.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center hover:border-brand-primary transition duration-300 group">
                            <div className="h-64 bg-gray-700 rounded-2xl mb-6 overflow-hidden relative">
                                {/* Mockup Content */}
                                <div className="absolute inset-2 bg-white rounded-xl overflow-hidden">
                                    <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                                        <span className="text-4xl mb-2">❤️</span>
                                        <span className="text-xs font-bold">Favorites</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Personalized Favorites</h3>
                            <p className="text-gray-400 text-sm">Save your favorite services for quick and easy re-booking.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center hover:border-brand-primary transition duration-300 group">
                            <div className="h-64 bg-gray-700 rounded-2xl mb-6 overflow-hidden relative">
                                {/* Mockup Content */}
                                <div className="absolute inset-2 bg-white rounded-xl overflow-hidden">
                                    <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                                        <span className="text-4xl mb-2">🚚</span>
                                        <span className="text-xs font-bold">Live Tracking</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Track Live Location</h3>
                            <p className="text-gray-400 text-sm">Monitor your laundry pickup and delivery in real-time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* FAQ Section */}
            <section className="py-24 bg-white dark:bg-deep-900">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">FAQ</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                            Questions? <span className="text-gray-900 dark:text-white">Look here.</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "What services does your laundry platform provide?", a: "We offer Wash & Fold, Dry Cleaning, Ironing, and Shoe Cleaning services." },
                            { q: "How do I schedule a laundry pickup?", a: "Simply log in to the app, select your services, choose a pickup date and time, and confirm your booking. Our driver will be there!" },
                            { q: "What are the benefits of using your laundry service?", a: "We provide convenient door-to-door service, real-time tracking, secure payments, and high-quality cleaning." },
                            { q: "Can I track the status of my laundry order?", a: "Yes, you can track your order status in real-time from the 'My Orders' section in the dashboard." },
                            { q: "Can I create multiple wishlists?", a: "Currently, you can save favorite services for quick access, but multiple wishlists are coming soon!" },
                            { q: "Is App available on both iOS and Android?", a: "Yes, our app is available for download on both the Apple App Store and Google Play Store." }
                        ].map((item, idx) => (
                            <details key={idx} className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden transition duration-300 open:bg-blue-50 dark:open:bg-blue-900/20">
                                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-gray-800 dark:text-white list-none">
                                    <span>{item.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed animate-fade-in">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
