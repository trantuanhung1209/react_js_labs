import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribeMessage('✓ Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <p className="text-gray-400 text-sm mb-6">
              Welcome to our website, a wonderful place to explore and learn how to cook like a pro.
            </p>
            
            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2 items-center bg-white bg-opacity-10 rounded-lg px-3 py-2 border border-gray-600 focus-within:border-pink-500 focus-within:bg-opacity-20 transition">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-pink-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                Subscribe
              </button>
              {subscribeMessage && (
                <p className="text-green-400 text-xs text-center">{subscribeMessage}</p>
              )}
            </form>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="font-bold text-lg mb-4">Learn More</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Our Cooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  See Our Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Recipes */}
          <div>
            <h4 className="font-bold text-lg mb-4">Recipes</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  What to Cook This Week
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Pasta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Dinner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Healthy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Vegetarian
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Vegan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Christmas
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Gift Subscription
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition duration-200">
                  Send Us Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-xs">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-white rounded text-slate-900 flex items-center justify-center font-bold text-xs">
                C
              </div>
              <span>© 2024 Chefify Company</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pink-500 transition duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-pink-500 transition duration-200">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
