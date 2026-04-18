import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="../public/main.png" 
          alt="Woman cooking in kitchen" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Recipe card */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-sm">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Yellow top banner */}
              <div className="bg-yellow-400 py-1 px-4">
                <p className="text-sm font-medium text-center">Recipe of the day</p>
              </div>
              
              {/* Card content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-pink-500 mb-3">Salad Caprese</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Classic Italian Salad Caprese: ripe tomatoes, fresh mozzarella, herbs, olive oil, and balsamic vinegar create a refreshing dish for lunch or appetizer.
                </p>
                
                {/* Salad icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <img src="../public/avt.png" alt="" />
                  </div>
                </div>
                
                {/* View now button */}
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-md py-2 px-4 text-sm font-medium flex items-center justify-center transition duration-300">
                  View now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
