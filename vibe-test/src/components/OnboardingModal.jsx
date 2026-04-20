import { useState } from 'react';

export default function OnboardingModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        '/images/3_Data/Lab_03/five_color_salad.png',
      alt: 'Delicious dishes'
    },
    {
      image:
        '/images/3_Data/Lab_03/lotus_delight_salad.png',
      alt: 'Chef preparing food'
    },
    {
      image:
        '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png',
      alt: 'Cooking preparation'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-transparent hover:bg-gray-100 rounded-full p-2 transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content Container */}
        <div className="p-8">
          {/* Title */}
          <h1 className="text-5xl font-bold text-pink-500 text-center mb-4">
            Discover Chefify
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-center mb-8 text-lg">
            Easy and delicious cooking instructions right here. Start exploring now!
          </p>

          {/* Image Carousel */}
          <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition ${
                  index === currentSlide
                    ? 'bg-pink-500 w-6'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={handleNext}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition mb-4"
          >
            Next
          </button>

          <button
            onClick={handleSkip}
            className="w-full text-pink-500 font-semibold hover:text-pink-600 transition py-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
