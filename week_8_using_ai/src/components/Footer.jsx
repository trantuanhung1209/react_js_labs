import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">Welcome to our website, a wonderful place to explore and learn how to cook like a pro.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 w-full md:w-64 rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r-md transition duration-300">
                Send
              </button>
            </div>
          </div>
          
          {/* Learn More Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Learn More</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Our Cookies</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">See Our Features</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Shop</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Gift Subscription</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Send Us Feedback</a></li>
            </ul>
          </div>
          
          {/* Recipes Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Recipes</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition duration-300">What to Cook This Week</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Pasta</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Dinner</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Healthy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Vegetarian</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Vegan</a></li>
              <li><a href="#" className="hover:text-pink-400 transition duration-300">Christmas</a></li>
            </ul>
          </div>
        </div>
        
        {/* Logo and Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-white mr-2">
              <Logo />
            </div>
            <span className="font-medium text-lg">Chefify</span>
          </div>
          <div className="text-gray-500 text-sm">
            <span>2023 Chefify Company</span>
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-pink-400 transition duration-300">Terms of Service</a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:text-pink-400 transition duration-300">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
