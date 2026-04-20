import { useState } from 'react';

const features = [
  '20,000+ recipes to suit all tastes and skill levels',
  'Filter for diets, cook times, and more',
  'Personal Recipe Box for favorites',
  'Gain exclusive access to our subscriber-only mobile app'
];

const includedFeatures = [
  {
    title: 'Cooking',
    description: 'Enjoy recipes, advice and inspiration for any occasion.'
  },
  {
    title: 'Wirecutter',
    description: 'Explore independent reviews for thousands of products.'
  },
  {
    title: 'Games',
    description: 'Unwind with Spelling Bee, Wordle, The Crossword'
  },
  {
    title: 'The Athletic',
    description: 'Discover in-depth, personalized sports journalism.'
  }
];

export default function SubscribePage({ onGoHome }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    setIsLoading(true);
    // Simulate subscription process
    setTimeout(() => {
      alert(`Subscribed to ${selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'} plan!`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-600 border-b">
        <button onClick={onGoHome} className="hover:text-pink-500 transition">
          Recipes
        </button>
        <span>›</span>
        <span className="text-pink-500 font-semibold">Subscribe</span>
      </div>

      {/* Main CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div>
            <p className="text-sm text-gray-600 mb-6">This recipe is exclusively available to subscribers</p>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-pink-500 mb-8 leading-tight">
              Join now to access effortless, hassle-free recipes
            </h1>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm">{feature}</p>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-800">0.25</span>
                <span className="text-lg text-gray-600">USD / Week</span>
              </div>
              <p className="text-sm text-gray-600">Billed as $1 every 4 weeks for the first year</p>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
              </svg>
              {isLoading ? 'Processing...' : 'Subscribe Now'}
            </button>

            <p className="text-center text-pink-500 text-sm mt-4 hover:underline cursor-pointer">
              Cancel or Pause anytime
            </p>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <img
              src="/images/3_Data/Lab_03/avacador_salad.png"
              alt="Cooking"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Features Grid Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-pink-500 mb-16">
            An All Access subscription includes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includedFeatures.map((feature, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-b from-white to-pink-50 rounded-2xl p-12 text-center border border-pink-100">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="text-2xl font-bold text-pink-500">Chefify</span>
          </div>

          <h3 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Chefify Cooking only</h3>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Enjoy thousands of delicious recipes for every taste, plus advice and inspiration daily.
          </p>

          {/* Pricing Options */}
          <div className="space-y-4 max-w-md mx-auto mb-10">
            {/* Monthly Plan */}
            <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
              style={{
                borderColor: selectedPlan === 'monthly' ? '#ec4899' : '#e5e7eb',
                backgroundColor: selectedPlan === 'monthly' ? '#fdf2f8' : 'transparent'
              }}
            >
              <input
                type="radio"
                name="plan"
                value="monthly"
                checked={selectedPlan === 'monthly'}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-5 h-5 text-pink-500 cursor-pointer"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-800">$2/month</p>
                <p className="text-sm text-gray-600">(Billed every 4 weeks)</p>
              </div>
            </label>

            {/* Yearly Plan */}
            <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
              style={{
                borderColor: selectedPlan === 'yearly' ? '#ec4899' : '#e5e7eb',
                backgroundColor: selectedPlan === 'yearly' ? '#fdf2f8' : 'transparent'
              }}
            >
              <input
                type="radio"
                name="plan"
                value="yearly"
                checked={selectedPlan === 'yearly'}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-5 h-5 text-pink-500 cursor-pointer"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-800">$20/year</p>
                <p className="text-sm text-gray-600">(Billed one annually)</p>
              </div>
              <div className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                Save 17%
              </div>
            </label>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-12 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition duration-200 disabled:opacity-50 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
            </svg>
            {isLoading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="text-pink-500 text-sm hover:underline cursor-pointer">
            Cancel or Pause anytime
          </p>
        </div>
      </div>
    </div>
  );
}
