import React, { useState } from 'react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

const CookingGuidePage = ({ recipe, onBack }) => {
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [cookingNote, setCookingNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Emma Roti',
      avatar: 'https://via.placeholder.com/40?text=ER',
      time: '2 hours ago',
      rating: 5,
      text: 'Love this recipe! Made it last weekend and my family loved it!',
      images: ['https://via.placeholder.com/80?text=Recipe1', 'https://via.placeholder.com/80?text=Recipe2']
    },
    {
      id: 2,
      author: 'Alex Vil',
      avatar: 'https://via.placeholder.com/40?text=AV',
      time: '1 day ago',
      rating: 4,
      text: 'Great guide! The photos really help understand each step. Only used less sugar than recommended.',
      images: []
    }
  ]);
  const { isSaved, toggleSave } = useSavedRecipes();

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const addCookingNote = () => {
    if (cookingNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: cookingNote, time: new Date().toLocaleString() }]);
      setCookingNote('');
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Prepare the base',
      description: 'Prepare all ingredients and equipment. In a large mixing bowl, gather the main ingredients and organize your workspace for efficient cooking.',
      image: '/images/3_Data/Lab_03/Snack cakes.png'
    },
    {
      number: 2,
      title: 'Mix ingredients',
      description: 'Combine all ingredients according to the recipe requirements. Mix thoroughly until the consistency is uniform and all components are well incorporated.',
      image: '/images/3_Data/Lab_03/Italian-style tomato.png'
    },
    {
      number: 3,
      title: 'Cook the dish',
      description: 'Apply heat as required by the recipe. Monitor cooking time carefully and ensure the dish is cooked to perfection with proper coloring and texture.',
      image: '/images/3_Data/Lab_03/Vegetable and shrimp spaghetti.png'
    },
    {
      number: 4,
      title: 'Prepare finishing touches',
      description: 'Add any final ingredients, seasonings, or garnishes. Make sure all elements are properly combined for the best presentation.',
      image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png'
    },
    {
      number: 5,
      title: 'Serve and enjoy',
      description: 'Plate the dish attractively and serve immediately while fresh. Enjoy your culinary creation with family and friends!',
      image: '/images/3_Data/Lab_03/lotus_delight_salad.png'
    }
  ];

  const recentlyViewed = [
    { id: 1, title: 'Salad with cabbage and shrimp', image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png' },
    { id: 2, title: 'Avocado Salad', image: '/images/3_Data/Lab_03/avacador_salad.png' },
    { id: 3, title: 'Sunny-side up fried eggs', image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png' },
    { id: 4, title: 'Corn Salad', image: '/images/3_Data/Lab_03/corn_salad.png' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 text-sm mb-4"
          >
            ← Back
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-2">Home › Cooking guide</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe?.title || 'How to make a Strawberry Shortcake'}</h1>
              <p className="text-gray-600 text-sm mb-4">
                {recipe?.description || 'A delicious strawberry shortcake recipe perfect for any occasion. Step-by-step guide with photos and tips.'}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {recipe?.author?.[0]?.toUpperCase() || 'EG'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{recipe?.author || 'Emma Gonzalez'}</p>
                </div>
                <button 
                  onClick={() => toggleSave(recipe)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    isSaved(recipe?.id) 
                      ? 'bg-pink-100 text-pink-500' 
                      : 'bg-gray-100 text-gray-400 hover:bg-pink-100 hover:text-pink-500'
                  }`}
                >
                  ♥
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-semibold text-gray-900">{recipe?.time || '45 minutes'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Yield</p>
                  <p className="font-semibold text-gray-900">{recipe?.yield || '2 portions'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Rating</p>
                  <p className="font-semibold text-gray-900">{'⭐'.repeat(recipe?.rating || 5)}</p>
                </div>
              </div>
            </div>

            {/* Recipe Image */}
            <div className="ml-8 hidden lg:block">
              <img 
                src={recipe?.image || '/images/3_Data/Lab_03/Snack cakes.png'} 
                alt={recipe?.title}
                className="w-80 h-56 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Ingredients */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-3 mb-6">
                {(recipe?.ingredients || [
                  '2 cups all-purpose flour',
                  '3/4 cup granulated sugar',
                  '2 1/2 teaspoons baking powder',
                  '1/2 teaspoon salt',
                  '1/2 cup butter',
                  '1/4 cup sugar',
                  '1/4 teaspoon vanilla extract'
                ]).map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <input 
                      type="checkbox"
                      checked={!!checkedIngredients[idx]}
                      onChange={() => toggleIngredient(idx)}
                      className="mt-1 w-4 h-4 text-pink-500 rounded focus:ring-pink-500 cursor-pointer"
                    />
                    <span className={checkedIngredients[idx] ? 'line-through text-gray-400' : 'text-gray-700 text-sm'}>
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition">
                Start Cooking
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-3">
            {/* Steps */}
            <div className="space-y-8 mb-12">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Step {step.number}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                  <img 
                    src={step.image} 
                    alt={`Step ${step.number}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Cooking Notes */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Cooking note</h3>
              <div className="flex gap-3">
                <textarea 
                  value={cookingNote}
                  onChange={(e) => setCookingNote(e.target.value)}
                  placeholder="Add your cooking notes here..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  rows="3"
                />
                <button 
                  onClick={addCookingNote}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition self-end"
                >
                  Add
                </button>
              </div>
              
              {/* Saved Notes */}
              {notes.length > 0 && (
                <div className="mt-4 space-y-2 border-t pt-4">
                  {notes.map(note => (
                    <div key={note.id} className="bg-gray-50 p-3 rounded text-sm">
                      <p className="text-gray-700">{note.text}</p>
                      <p className="text-gray-400 text-xs mt-1">{note.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comments */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Comments</h3>
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4 mb-3">
                      <img 
                        src={comment.avatar} 
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{comment.author}</p>
                        <p className="text-gray-500 text-xs">{comment.time}</p>
                      </div>
                      <p className="text-pink-500 text-sm">{'⭐'.repeat(comment.rating)}</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{comment.text}</p>
                    {comment.images.length > 0 && (
                      <div className="flex gap-2">
                        {comment.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`Comment ${idx}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Your recently viewed</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentlyViewed.map(item => (
                  <div key={item.id} className="text-center cursor-pointer group">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-80 transition"
                    />
                    <p className="text-sm text-gray-700 font-medium line-clamp-2">{item.title}</p>
                    <p className="text-xs text-pink-500 mt-1">♥</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CookingGuidePage;
