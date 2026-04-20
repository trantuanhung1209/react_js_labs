import { useState, useMemo } from 'react';
import { useAuth } from '../context/useAuth';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

export default function RecipeBoxPage({ onGoHome, onViewRecipe }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved', 'folders', 'recipes'
  const [currentPage, setCurrentPage] = useState(1);
  const { savedRecipes, isLoading, removeRecipe } = useSavedRecipes();

  const ITEMS_PER_PAGE = 8;

  // Get paginated recipes
  const totalPages = Math.ceil(savedRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return savedRecipes.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [savedRecipes, currentPage]);

  const handleRemoveRecipe = (id) => {
    removeRecipe(id);
    // Reset to page 1 if current page is now empty
    if (currentPage > Math.ceil((savedRecipes.length - 1) / ITEMS_PER_PAGE) && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-600 border-b">
        <button onClick={onGoHome} className="hover:text-pink-500 transition">
          Home
        </button>
        <span>›</span>
        <span className="text-pink-500 font-semibold">Your Recipe Box</span>
      </div>

      {/* User Profile Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 border-b">
        <div className="flex gap-6 items-start">
          {/* Avatar */}
          <div className="w-40 h-40 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white text-6xl font-bold">
              {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
            </span>
          </div>

          {/* Profile Info */}
          <div className="flex-1 pt-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {user?.firstName} {user?.lastName}'s Recipe Box
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Welcome to {user?.firstName}'s Recipe Box! Explore a curated collection of delicious recipes, cooking tips, and culinary inspirations. Discover new flavors and techniques that will elevate your cooking game. Happy cooking!
            </p>
            <div className="flex gap-4">
              <div>
                <p className="text-2xl font-bold text-pink-500">
                  {savedRecipes.length}
                </p>
                <p className="text-sm text-gray-600">Saved Recipes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-500">
                  {Math.floor(Math.random() * 50) + 100}
                </p>
                <p className="text-sm text-gray-600">Subscriptions</p>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition flex items-center gap-2 h-fit">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a1 1 0 11-2 0 1 1 0 012 0z" />
              <path d="M17.414 13.586a2 2 0 00-2.828-2.828L7.07 20.071A2 2 0 005 21.998v-3.999a2 2 0 012-2h3.999l6.414-6.414z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => {
              setActiveTab('saved');
              setCurrentPage(1);
            }}
            className={`pb-4 font-semibold transition border-b-2 ${
              activeTab === 'saved'
                ? 'text-pink-500 border-pink-500'
                : 'text-gray-600 border-transparent hover:text-pink-500'
            }`}
          >
            Saved Recipes
          </button>
          <button
            onClick={() => {
              setActiveTab('folders');
              setCurrentPage(1);
            }}
            className={`pb-4 font-semibold transition border-b-2 ${
              activeTab === 'folders'
                ? 'text-pink-500 border-pink-500'
                : 'text-gray-600 border-transparent hover:text-pink-500'
            }`}
          >
            Folders
          </button>
          <button
            onClick={() => {
              setActiveTab('recipes');
              setCurrentPage(1);
            }}
            className={`pb-4 font-semibold transition border-b-2 ${
              activeTab === 'recipes'
                ? 'text-pink-500 border-pink-500'
                : 'text-gray-600 border-transparent hover:text-pink-500'
            }`}
          >
            Recipes by {user?.firstName}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'saved' && (
          <>
            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : savedRecipes.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No saved recipes yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Start exploring and save your favorite recipes!
                </p>
                <button
                  onClick={onGoHome}
                  className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
                >
                  Explore Recipes
                </button>
              </div>
            ) : (
              <>
                {/* Recipe Grid */}
                <div className="grid grid-cols-4 gap-6 mb-12">
                  {paginatedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      onClick={() => onViewRecipe && onViewRecipe(recipe)}
                      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition group cursor-pointer"
                    >
                      {/* Image Container */}
                      <div className="relative h-40 bg-gray-200 overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveRecipe(recipe.id);
                          }}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:shadow-lg transition hover:bg-red-50"
                        >
                          <svg
                            className="w-5 h-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 h-9">
                          {recipe.title}
                        </h3>
                        <p className="text-pink-500 text-xs font-semibold">
                          ⏱ {recipe.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="text-gray-600 hover:text-gray-800 transition"
                      disabled={currentPage === 1}
                    >
                      ‹
                    </button>

                    {[...Array(Math.min(totalPages, 11))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 11) {
                        pageNum = i + 1;
                      } else if (currentPage <= 6) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 5) {
                        pageNum = totalPages - 10 + i;
                      } else {
                        pageNum = currentPage - 5 + i;
                      }

                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded ${
                            currentPage === pageNum
                              ? 'bg-pink-500 text-white font-bold'
                              : 'border border-gray-300 text-gray-700 hover:border-pink-500'
                          } transition`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 11 && currentPage < totalPages - 5 && (
                      <span className="text-gray-600">...</span>
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      className="text-gray-600 hover:text-gray-800 transition"
                      disabled={currentPage === totalPages}
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'folders' && (
          <div className="text-center py-16">
            <p className="text-gray-600">Create folders to organize your recipes</p>
          </div>
        )}

        {activeTab === 'recipes' && (
          <div className="text-center py-16">
            <p className="text-gray-600">Recipes created by {user?.firstName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
