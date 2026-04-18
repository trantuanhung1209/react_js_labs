import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

export default function DiscoverModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
      title: 'Summer Recipes'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=400&fit=crop',
      title: 'Fresh Salads'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
      title: 'Delicious Dishes'
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 hover:bg-gray-100 transition"
        >
          <X size={24} className="text-gray-700" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6">
          <h2 className="text-3xl font-bold text-pink-500">Discover Chefify</h2>
          <p className="text-gray-600 text-sm mt-2">
            Easy and delicious cooking instructions right here. Start exploring now!
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative bg-gray-200 h-64 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full h-64 flex-shrink-0"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 py-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-6 bg-pink-500'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handleNext}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
