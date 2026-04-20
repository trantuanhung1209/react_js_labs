import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';

export default function Header({ 
  currentPage,
  onLoginClick, 
  onSearch, 
  onGoHome, 
  onGoToRecipeBox, 
  onGoToSubscribe,
  onGoToWhatToCook,
  onGoToRecipes,
  onGoToIngredients,
  onGoToOccasions,
  onGoToAboutUs
}) {
  const { user, logout, isAuthenticated } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Load search value from URL on mount
  useEffect(() => {
    const loadSearchFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q');
      setSearchValue(qParam || '');
    };

    loadSearchFromURL();

    // Listen for back/forward navigation
    window.addEventListener('popstate', loadSearchFromURL);
    return () => window.removeEventListener('popstate', loadSearchFromURL);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={onGoHome}
        >
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-2xl font-bold text-pink-500">Chefify</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 mx-8">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="What would you like to cook?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 bg-transparent ml-2 text-sm outline-none"
            />
          </div>
        </form>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 mr-6">
          <button 
            onClick={onGoToWhatToCook} 
            className={`text-sm font-medium transition pb-1 ${ 
              currentPage === 'whatToCook' 
                ? 'text-pink-500 border-b-2 border-pink-500' 
                : 'text-gray-700 hover:text-pink-500'
            }`}
          >
            What to cook
          </button>
          <button 
            onClick={onGoToRecipes} 
            className={`text-sm font-medium transition pb-1 ${
              currentPage === 'recipes' 
                ? 'text-pink-500 border-b-2 border-pink-500' 
                : 'text-gray-700 hover:text-pink-500'
            }`}
          >
            Recipes
          </button>
          <button 
            onClick={onGoToIngredients} 
            className={`text-sm font-medium transition pb-1 ${
              currentPage === 'ingredients' 
                ? 'text-pink-500 border-b-2 border-pink-500' 
                : 'text-gray-700 hover:text-pink-500'
            }`}
          >
            Ingredients
          </button>
          <button 
            onClick={onGoToOccasions} 
            className={`text-sm font-medium transition pb-1 ${
              currentPage === 'occasions' 
                ? 'text-pink-500 border-b-2 border-pink-500' 
                : 'text-gray-700 hover:text-pink-500'
            }`}
          >
            Occasions
          </button>
          <button 
            onClick={onGoToAboutUs} 
            className={`text-sm font-medium transition pb-1 ${
              currentPage === 'aboutUs' 
                ? 'text-pink-500 border-b-2 border-pink-500' 
                : 'text-gray-700 hover:text-pink-500'
            }`}
          >
            About Us
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 relative">
          {isAuthenticated ? (
            <>
              {/* Your Recipe Box Button */}
              <button
                onClick={onGoToRecipeBox}
                className="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-200 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Your Recipe Box
              </button>

              {/* Subscribe Button */}
              <button
                onClick={onGoToSubscribe}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-pink-700 transition"
              >
                Subscribe
              </button>

              {/* User Profile Button */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.firstName?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm text-gray-700 hidden sm:inline">{user?.firstName}</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-10">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    My Recipes
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    Favorites
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-pink-500 font-medium text-sm hover:text-pink-600 transition"
              >
                Login
              </button>
              <button 
                onClick={onGoToSubscribe}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-pink-700 transition"
              >
                Subscribe
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
