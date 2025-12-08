import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans flex flex-col">
            <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Laundex</h1>
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12 flex-1">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">Last Updated: December 2025</p>

                    <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
                            <p className="mb-2">We collect information you provide directly to us, such as when you create an account, place an order, or communicate with us. This may include:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Name, email address, phone number, and physical address.</li>
                                <li>Payment information (processed securely by third-party payment gateways).</li>
                                <li>Order history and preferences.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
                            <p className="mb-2">We use the collected information to:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Process and deliver your laundry orders.</li>
                                <li>Communicate with you about your orders, account, and promotional offers.</li>
                                <li>Improve our services and app functionality.</li>
                                <li>Ensure the security of our platform.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Data Sharing & Security</h2>
                            <p className="mb-2">We do not sell your personal data. We may share your data with:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Service providers (e.g., delivery partners, payment processors) who assist in our operations.</li>
                                <li>Law enforcement if required by law.</li>
                            </ul>
                            <p className="mt-2">We implement industry-standard security measures to protect your data, but no method of transmission over the internet is 100% secure.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Cookies</h2>
                            <p>We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookie preferences through your browser settings.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information. You can manage your account details within the app or contact us for assistance.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@laundex.in" className="text-blue-600 hover:underline">privacy@laundex.in</a>.</p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
