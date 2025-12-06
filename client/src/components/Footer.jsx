import { Link } from 'react-router-dom';
import { Play, Smartphone, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-auto">
            {/* Download App Banner */}
            <div className="bg-blue-500 relative overflow-hidden py-16 px-6 text-center">
                <div className="container mx-auto relative z-10">
                    <p className="text-blue-100 mb-2 text-lg">Your Ultimate Solution for Hassle-Free Laundry Services</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Download the App Now!</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-sm">
                        Experience the convenience of premium laundry services right at your fingertips. Schedule pickups, track orders, and enjoy fresh clothes without the hassle.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition transform hover:scale-105">
                            <div className="text-2xl"><Play fill="currentColor" size={24} /></div>
                            <div className="text-left">
                                <div className="text-[10px] uppercase tracking-wider">Get it on</div>
                                <div className="text-lg font-bold leading-none">Google Play</div>
                            </div>
                        </button>
                        <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition transform hover:scale-105">
                            <div className="text-2xl"><Smartphone size={24} /></div>
                            <div className="text-left">
                                <div className="text-[10px] uppercase tracking-wider">Download on the</div>
                                <div className="text-lg font-bold leading-none">App Store</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-gray-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">Q</div>
                                <h2 className="text-2xl font-bold">Laundry</h2>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Laundex is dedicated to providing top-tier laundry and dry cleaning services. We prioritize quality, convenience, and customer satisfaction.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition">
                                    <Facebook size={18} />
                                </a>
                                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition">
                                    <Youtube size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h3 className="font-bold text-lg mb-6">Company</h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                                <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
                                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6">Contact</h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li>+91 8667327866</li>
                                <li>+91 7548855208</li>
                                <li>www.quickwashpro.in</li>
                                <li>support@quickwashpro.in</li>
                                <li>Mevalurkuppam, Chennai, Tamilnadu, India</li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-bold text-lg mb-6">Get the latest information</h3>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="bg-gray-800 text-white px-4 py-3 rounded-l-lg focus:outline-none w-full text-sm"
                                />
                                <button className="bg-blue-600 px-4 py-3 rounded-r-lg hover:bg-blue-700 transition flex items-center justify-center">
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <p>Copyright © 2025 Laundex. All Rights Reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition">User Terms & Conditions</a>
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
