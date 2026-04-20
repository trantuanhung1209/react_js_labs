import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecipeGrid from './components/RecipeGrid';
import EditorPickSection from './components/EditorPickSection';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import LoginModal from './components/LoginModal';
import SearchPage from './components/SearchPage';
import RecipeBoxPage from './components/RecipeBoxPage';
import SubscribePage from './components/SubscribePage';
import CookingGuidePage from './components/CookingGuidePage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import WhatToCookPage from './components/WhatToCookPage';
import RecipesPage from './components/RecipesPage';
import IngredientsPage from './components/IngredientsPage';
import OccasionsPage from './components/OccasionsPage';
import AboutUsPage from './components/AboutUsPage';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'search', 'recipeBox', 'subscribe', 'cookingGuide', 'whatToCook', 'recipes', 'ingredients', 'occasions', 'aboutUs'
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if admin session exists on mount
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      setIsAdminLoggedIn(true);
    }

    // Keyboard shortcut to access admin (Ctrl+Shift+A)
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
        window.history.pushState(null, '', '/admin');
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSearch = (query) => {
    // Update URL params
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    
    const newUrl = params.toString()
      ? `/search?${params.toString()}`
      : '/search';
    
    window.history.pushState(null, '', newUrl);
    
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleGoHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentPage('home');
    setSearchQuery('');
  };

  const handleGoToRecipeBox = () => {
    window.history.pushState(null, '', '/recipe-box');
    setCurrentPage('recipeBox');
  };

  const handleGoToSubscribe = () => {
    window.history.pushState(null, '', '/subscribe');
    setCurrentPage('subscribe');
  };

  const handleViewCookingGuide = (recipe) => {
    setCurrentRecipe(recipe);
    window.history.pushState(null, '', `/cooking-guide/${recipe.id}`);
    setCurrentPage('cookingGuide');
  };

  const handleBackFromCookingGuide = () => {
    setCurrentPage('search');
    window.history.pushState(null, '', '/search');
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    window.history.pushState(null, '', '/admin');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminSession');
    setIsAdminLoggedIn(false);
    window.history.pushState(null, '', '/');
    setCurrentPage('home');
  };

  const handleGoToWhatToCook = () => {
    window.history.pushState(null, '', '/what-to-cook');
    setCurrentPage('whatToCook');
  };

  const handleGoToRecipes = () => {
    window.history.pushState(null, '', '/recipes');
    setCurrentPage('recipes');
  };

  const handleGoToIngredients = () => {
    window.history.pushState(null, '', '/ingredients');
    setCurrentPage('ingredients');
  };

  const handleGoToOccasions = () => {
    window.history.pushState(null, '', '/occasions');
    setCurrentPage('occasions');
  };

  const handleGoToAboutUs = () => {
    window.history.pushState(null, '', '/about-us');
    setCurrentPage('aboutUs');
  };

  // Initialize page and search from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    if (path === '/recipe-box') {
      setCurrentPage('recipeBox');
    } else if (path === '/subscribe') {
      setCurrentPage('subscribe');
    } else if (path === '/what-to-cook') {
      setCurrentPage('whatToCook');
    } else if (path === '/recipes') {
      setCurrentPage('recipes');
    } else if (path === '/ingredients') {
      setCurrentPage('ingredients');
    } else if (path === '/occasions') {
      setCurrentPage('occasions');
    } else if (path === '/about-us') {
      setCurrentPage('aboutUs');
    } else if (path === '/search' || params.has('q')) {
      setCurrentPage('search');
      const q = params.get('q');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);
  // Sample data for "This Summer Recipes"
  const summerRecipes = [
    {
      image: '/images/3_Data/Lab_03/Italian-style tomato.png',
      title: 'Italian-style tomato pasta',
      duration: '20 minutes'
    },
    {
      image: '/images/3_Data/Lab_03/Vegetable and shrimp spaghetti.png',
      title: 'Spaghetti with vegetables and shrimp',
      duration: '25 minutes'
    },
    {
      image: '/images/3_Data/Lab_03/lotus_delight_salad.png',
      title: 'Lotus delight salad',
      duration: '15 minutes'
    },
    {
      image: '/images/3_Data/Lab_03/Snack cakes.png',
      title: 'Snack cakes',
      duration: '30 minutes'
    }
  ];

  // Sample data for "Recipes With Videos"
  const videoRecipes = [
    {
      image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png',
      title: 'Salad with cabbage and shrimp',
      duration: '20 minutes'
    },
    {
      image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png',
      title: 'Salad of cove beans, shrimp and potatoes',
      duration: '25 minutes'
    },
    {
      image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png',
      title: 'Sunny-side up fried egg',
      duration: '10 minutes'
    },
    {
      image: '/images/3_Data/Lab_03/Lotus delight salad_01.png',
      title: 'Lotus delight salad',
      duration: '18 minutes'
    }
  ];

  // Sample data for "Editor's Pick"
  const editorPicks = [
    {
      image: '/images/3_Data/Lab_03/avacador_salad.png',
      title: 'Avocado Salad',
      chef: 'Jennifer King',
      avatar: '/images/3_Data/Lab_03/avatar.png',
      description: 'Fresh and creamy avocado salad with seasonal vegetables and a light vinaigrette dressing.'
    },
    {
      image: '/images/3_Data/Lab_03/corn_salad.png',
      title: 'Corn Salad',
      chef: 'Matthew Martinez',
      avatar: '/images/3_Data/Lab_03/avatar_small.png',
      description: 'Delicious corn salad with fresh vegetables and a tangy lime dressing for a refreshing meal.'
    },
    {
      image: '/images/3_Data/Lab_03/cucumber_salad_charry_tomatoes.png',
      title: 'Cucumber & Cherry Tomato Salad',
      chef: 'Sarah Hill',
      avatar: '/images/3_Data/Lab_03/avatar.png',
      description: 'Light and crisp cucumber salad with cherry tomatoes and a fresh herb dressing.'
    },
    {
      image: '/images/3_Data/Lab_03/five_color_salad.png',
      title: 'Five Color Salad',
      chef: 'Julia Lopez',
      avatar: '/images/3_Data/Lab_03/avatar_small.png',
      description: 'Vibrant mix of colorful vegetables and fresh ingredients for a nutritious and delicious meal.'
    }
  ];

  return (
    <>
      {/* Admin Routes */}
      {isAdminLoggedIn ? (
        <AdminDashboard onLogout={handleAdminLogout} />
      ) : window.location.pathname === '/admin' ? (
        <AdminLoginPage onAdminLogin={handleAdminLogin} />
      ) : (
        /* Regular App */
        <div className="min-h-screen bg-white flex flex-col">
          <OnboardingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
          
          {/* Header - Shared across all pages */}
          <Header 
            currentPage={currentPage}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onSearch={handleSearch}
            onGoHome={handleGoHome}
            onGoToRecipeBox={handleGoToRecipeBox}
            onGoToSubscribe={handleGoToSubscribe}
            onGoToWhatToCook={handleGoToWhatToCook}
            onGoToRecipes={handleGoToRecipes}
            onGoToIngredients={handleGoToIngredients}
            onGoToOccasions={handleGoToOccasions}
            onGoToAboutUs={handleGoToAboutUs}
          />
          
          {/* Main Content - Changes based on current page */}
          <main className="flex-1">
            {currentPage === 'cookingGuide' ? (
              <CookingGuidePage recipe={currentRecipe} onBack={handleBackFromCookingGuide} />
            ) : currentPage === 'search' ? (
              <SearchPage searchQuery={searchQuery} onViewRecipe={handleViewCookingGuide} />
            ) : currentPage === 'recipeBox' ? (
              <RecipeBoxPage onGoHome={handleGoHome} onViewRecipe={handleViewCookingGuide} />
            ) : currentPage === 'subscribe' ? (
              <SubscribePage onGoHome={handleGoHome} />
            ) : currentPage === 'whatToCook' ? (
              <WhatToCookPage onViewRecipe={handleViewCookingGuide} />
            ) : currentPage === 'recipes' ? (
              <RecipesPage onViewRecipe={handleViewCookingGuide} />
            ) : currentPage === 'ingredients' ? (
              <IngredientsPage onViewRecipe={handleViewCookingGuide} />
            ) : currentPage === 'occasions' ? (
              <OccasionsPage onViewRecipe={handleViewCookingGuide} />
            ) : currentPage === 'aboutUs' ? (
              <AboutUsPage />
            ) : (
              <>
                <HeroSection />
                <RecipeGrid
                  title="This Summer Recipes"
                  subtitle="We have all your Independence Day sweets covered."
                  recipes={summerRecipes}
                  onViewRecipe={handleViewCookingGuide}
                />
                <RecipeGrid
                  title="Recipes With Videos"
                  subtitle="Cooking Up Culinary Creations with Step-by-Step Videos"
                  recipes={videoRecipes}
                  onViewRecipe={handleViewCookingGuide}
                />
                <EditorPickSection picks={editorPicks} onViewRecipe={handleViewCookingGuide} />
              </>
            )}
          </main>
          
          {/* Footer - Shared across all pages */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
