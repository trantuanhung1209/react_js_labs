import { useState, useCallback, useEffect } from 'react';

export function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const loadSavedRecipes = () => {
      try {
        const saved = localStorage.getItem('savedRecipes');
        setSavedRecipes(saved ? JSON.parse(saved) : []);
      } catch (error) {
        console.error('Error loading saved recipes:', error);
        setSavedRecipes([]);
      }
      setIsLoading(false);
    };

    loadSavedRecipes();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'savedRecipes') {
        const newRecipes = e.newValue ? JSON.parse(e.newValue) : [];
        setSavedRecipes(newRecipes);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Add recipe to saved list
  const addRecipe = useCallback((recipe) => {
    setSavedRecipes((prev) => {
      const isAlreadySaved = prev.some((r) => r.id === recipe.id);
      if (isAlreadySaved) return prev;

      const updated = [...prev, recipe];
      localStorage.setItem('savedRecipes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Remove recipe from saved list
  const removeRecipe = useCallback((recipeId) => {
    setSavedRecipes((prev) => {
      const updated = prev.filter((r) => r.id !== recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if recipe is saved
  const isSaved = useCallback((recipeId) => {
    return savedRecipes.some((r) => r.id === recipeId);
  }, [savedRecipes]);

  // Toggle save status
  const toggleSave = useCallback((recipe) => {
    if (isSaved(recipe.id)) {
      removeRecipe(recipe.id);
      return false;
    } else {
      addRecipe(recipe);
      return true;
    }
  }, [isSaved, addRecipe, removeRecipe]);

  // Clear all saved recipes
  const clearAll = useCallback(() => {
    setSavedRecipes([]);
    localStorage.removeItem('savedRecipes');
  }, []);

  return {
    savedRecipes,
    isLoading,
    addRecipe,
    removeRecipe,
    isSaved,
    toggleSave,
    clearAll
  };
}
