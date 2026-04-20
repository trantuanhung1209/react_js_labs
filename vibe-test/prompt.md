# Chefify - Recipe Discovery & Sharing Platform

## Project Overview
**Chefify** is a modern recipe discovery and sharing web application built with React + Vite. It allows users to explore recipes, save favorites, follow cooking guides, and manage a personal recipe box. The application includes user authentication, admin dashboard, and subscription features.

---

## Tech Stack
- **Frontend Framework**: React 19.2.5
- **Build Tool**: Vite 8.0.9
- **Styling**: Tailwind CSS 4.2.2 with @tailwindcss/vite
- **Node Version**: Latest LTS
- **Package Manager**: npm

---

## Project Structure

```
src/
├── App.jsx                      # Main app component with routing logic
├── App.css                      # Global styles
├── main.jsx                     # Entry point
├── index.css                    # Base styles
├── components/
│   ├── Header.jsx              # Navigation header (shared across all pages)
│   ├── Footer.jsx              # Footer component
│   ├── HeroSection.jsx         # Hero banner on home page
│   ├── RecipeGrid.jsx          # Reusable recipe grid component
│   ├── RecipeCard.jsx          # Individual recipe card
│   ├── EditorPickSection.jsx   # Editor's picks showcase
│   ├── EditorPickCard.jsx      # Individual editor pick card
│   ├── HomePage/               # Home page (default view)
│   ├── SearchPage.jsx          # Recipe search & filter page
│   ├── RecipeBoxPage.jsx       # User's saved recipes
│   ├── SubscribePage.jsx       # Subscription page
│   ├── CookingGuidePage.jsx    # Step-by-step cooking guide
│   ├── WhatToCookPage.jsx      # Recipe discovery by preferences
│   ├── RecipesPage.jsx         # All recipes listing
│   ├── IngredientsPage.jsx     # Ingredient-based discovery
│   ├── OccasionsPage.jsx       # Recipes by occasion
│   ├── AboutUsPage.jsx         # About us page
│   ├── LoginModal.jsx          # Login modal dialog
│   ├── OnboardingModal.jsx     # Welcome modal
│   ├── AdminLoginPage.jsx      # Admin authentication page
│   └── AdminDashboard.jsx      # Admin user management dashboard
├── context/
│   ├── AuthContext.jsx         # Authentication context provider
│   └── useAuth.js              # Auth context hook
├── hooks/
│   └── useSavedRecipes.js      # Hook for managing saved recipes
└── assets/                     # Static assets
```

---

## Core Features

### 1. **Home Page**
- Hero section with featured image/banner
- Two recipe grids:
  - "This Summer Recipes" collection
  - "Recipes With Videos" collection
- Editor's picks section
- Footer navigation

### 2. **Search & Discovery**
- **Search Page**: Search recipes by keyword
- **What to Cook**: Filter recipes by:
  - Meal type (Breakfast, Lunch, Dinner, Dessert, Snacks)
  - Dietary restrictions (Vegan, Vegetarian, Gluten-Free, Keto, Paleo)
  - Cooking time
- **Recipes Page**: Browse all recipes
- **Ingredients Page**: Find recipes by ingredients
- **Occasions Page**: Recipes for specific occasions

### 3. **User Features**
- User authentication (Registration & Login)
- Recipe Box: Save favorite recipes
- Cooking Guide: Step-by-step instructions for selected recipes
- Subscribe button (subscription page)
- User profile dropdown with options

### 4. **Admin Features**
- Admin login (Keyboard shortcut: Ctrl+Shift+A)
- Dashboard for managing users
- View all registered users
- Search and filter users
- Edit user information
- Delete user accounts
- User status management
- User statistics (Total users, Active users, Total orders)

### 5. **Navigation**
Header includes navigation to:
- Home (logo click)
- What to Cook
- Recipes
- Ingredients
- Occasions
- About Us
- Search bar
- Recipe Box (authenticated users)
- Subscribe
- Login/Profile (depends on auth state)

---

## State Management

### App.jsx Global State
```javascript
const [isModalOpen, setIsModalOpen]              // Onboarding modal
const [isLoginModalOpen, setIsLoginModalOpen]    // Login modal
const [currentPage, setCurrentPage]              // Current page: 'home', 'search', 'recipeBox', 'subscribe', 'cookingGuide', 'whatToCook', 'recipes', 'ingredients', 'occasions', 'aboutUs'
const [searchQuery, setSearchQuery]              // Current search query
const [currentRecipe, setCurrentRecipe]          // Recipe being viewed in cooking guide
const [isAdminLoggedIn, setIsAdminLoggedIn]      // Admin authentication state
```

### Authentication (via AuthContext)
- User information stored in localStorage
- Registered users list stored in localStorage
- Features:
  - Login/Logout
  - Registration
  - Email validation
  - Session persistence

### Saved Recipes (via useSavedRecipes hook)
- Saved recipes stored in localStorage
- Toggle save/unsave recipes
- Check if recipe is saved

---

## URL Routing (Client-side)
The app uses `window.history.pushState()` for URL management:
- `/` - Home page
- `/search?q=keyword` - Search results
- `/recipe-box` - Saved recipes
- `/subscribe` - Subscription page
- `/cooking-guide/:id` - Cooking guide for recipe
- `/what-to-cook` - Discovery page
- `/recipes` - All recipes
- `/ingredients` - Ingredient discovery
- `/occasions` - Occasion-based recipes
- `/about-us` - About us page
- `/admin` - Admin login page

---

## Component Props & Event Handlers

### App.jsx passes to Header
```javascript
onLoginClick              // Open login modal
onSearch                  // Handle search submission
onGoHome                  // Navigate to home
onGoToRecipeBox          // Navigate to recipe box
onGoToSubscribe          // Navigate to subscribe
onGoToWhatToCook         // Navigate to what to cook
onGoToRecipes            // Navigate to recipes
onGoToIngredients        // Navigate to ingredients
onGoToOccasions          // Navigate to occasions
onGoToAboutUs            // Navigate to about us
```

### Recipe-related handlers
```javascript
onViewRecipe(recipe)      // Open cooking guide for recipe
onBack()                  // Navigate back
onGoHome()                // Navigate to home
```

---

## Data Models

### Recipe Object
```javascript
{
  id: number,
  title: string,
  image: string (URL),
  duration: string,        // "20 minutes"
  time: number,           // minutes (for filtering)
  type: string,           // 'breakfast', 'lunch', 'dinner', etc.
  dietary: string[],      // ['vegan', 'vegetarian', etc.]
  chef?: string,          // Chef name (for editor picks)
  avatar?: string,        // Avatar URL
  description?: string
}
```

### User Object
```javascript
{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,       // (hashed or plain for this MVP)
  status?: string,        // 'active' or 'inactive'
  orders?: number,        // For admin tracking
  createdAt?: timestamp
}
```

### Editor Pick Object
```javascript
{
  image: string,
  title: string,
  chef: string,
  avatar: string,
  description: string
}
```

---

## Key Features to Implement

### Phase 1 - Core (Completed)
- [x] Home page with recipe grids
- [x] Header with navigation
- [x] Basic authentication (Login/Register)
- [x] Search functionality
- [x] Recipe Box (save/view saved recipes)
- [x] Cooking guide page
- [x] Admin dashboard with user management

### Phase 2 - Discovery Pages (Completed)
- [x] What to Cook (filtered discovery)
- [x] Recipes page (all recipes)
- [x] Ingredients page
- [x] Occasions page
- [x] About Us page

### Phase 3 - Enhancements (Future)
- [ ] Video integration for recipes
- [ ] Ratings and reviews
- [ ] Social sharing
- [ ] Meal planning
- [ ] Grocery list generator
- [ ] Backend API integration
- [ ] User preferences/favorites
- [ ] Comments on recipes

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm lint
```

---

## Browser Storage (localStorage)

### Keys Used
- `user` - Current logged-in user JSON
- `registeredUsers` - Array of all registered users
- `savedRecipes` - Array of user's saved recipe IDs
- `adminSession` - Admin session indicator

---

## Styling Approach
- **Framework**: Tailwind CSS with utility classes
- **Color Scheme**:
  - Primary: Pink (`from-pink-500`, `to-pink-600`)
  - Neutral: Gray palette for backgrounds
  - Accent: White for cards and overlays
- **Responsive**: Mobile-first design with breakpoints (md, lg)
- **Components**: Rounded corners, shadows, transitions for modern look

---

## Navigation Flow

```
Home
├── Header (shared across all pages)
│   ├── What to Cook → WhatToCookPage
│   ├── Recipes → RecipesPage
│   ├── Ingredients → IngredientsPage
│   ├── Occasions → OccasionsPage
│   ├── About Us → AboutUsPage
│   ├── Search → SearchPage (with query)
│   ├── Recipe Box (if logged in) → RecipeBoxPage
│   └── Subscribe → SubscribePage
├── Home Hero & Sections
│   └── Recipe Card → CookingGuidePage
├── Login Modal (overlay)
└── Onboarding Modal (welcome)

Admin (Keyboard shortcut: Ctrl+Shift+A)
└── AdminDashboard
    ├── User List View
    ├── User Edit Form
    └── Delete Confirmation
```

---

## Authentication Flow

1. **Register**: User provides First Name, Last Name, Email, Password
2. **Login**: Email & Password validation against registered users
3. **Session**: User data stored in localStorage (`user` key)
4. **Logout**: Clear user from localStorage
5. **Admin Login**: Special admin login page with admin credentials
6. **Admin Session**: Stored via `adminSession` key in localStorage

---

## Best Practices Applied

1. **Component Organization**: Each page is a separate component
2. **Reusability**: RecipeCard, RecipeGrid, EditorPickCard are reusable
3. **Context API**: AuthContext for global authentication state
4. **Custom Hooks**: useSavedRecipes for recipe management, useAuth for auth
5. **URL Routing**: Client-side routing with URL state persistence
6. **Responsive Design**: Mobile and desktop support
7. **localStorage**: For persistence without backend
8. **Event Handling**: Proper prop drilling for navigation

---

## Future Enhancement Ideas

1. **Backend Integration**: Replace localStorage with API
2. **Database**: PostgreSQL/MongoDB for users and recipes
3. **Authentication**: JWT tokens instead of localStorage
4. **Rich Content**: Image uploads, video embeds
5. **Social Features**: Follow chefs, rate recipes, comments
6. **Notifications**: Email or push notifications
7. **Analytics**: Track popular recipes, user behavior
8. **Performance**: Lazy loading, code splitting
9. **Testing**: Unit tests with Jest, E2E with Cypress
10. **PWA**: Make it installable and work offline

---

## Notes for Development

- Use `window.history.pushState()` for navigation (no react-router)
- All data is mock data or stored in localStorage
- Admin access via keyboard shortcut: **Ctrl+Shift+A**
- Recipes are filtered client-side with `useMemo` for performance
- Modal positioning uses `z-index` for proper layering
- Mobile menu might be hidden on small screens (responsive nav planned)

---

## Getting Started with Regeneration

To regenerate or expand this project, follow this structure:

1. **Setup**: Initialize Vite + React + Tailwind
2. **Context**: Create AuthContext and useAuth hook
3. **Hooks**: Create useSavedRecipes hook
4. **Components**: Build reusable components first (Card, Grid)
5. **Pages**: Build each page component
6. **Routing**: Implement URL-based navigation in App.jsx
7. **Modals**: Add Login and Onboarding modals
8. **Admin**: Build admin login and dashboard
9. **Styling**: Apply Tailwind throughout
10. **Testing**: Test all features locally

---

## File Size Reference
This is a lightweight MVP (~15KB source code) perfect for learning React patterns and can be scaled with backend services.

