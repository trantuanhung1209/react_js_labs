import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Helper function to get all registered users
  const getRegisteredUsers = () => {
    try {
      const users = localStorage.getItem('registeredUsers');
      return users ? JSON.parse(users) : [];
    } catch (err) {
      console.error('Error getting registered users:', err);
      return [];
    }
  };

  // Helper function to save registered users
  const saveRegisteredUsers = (users) => {
    try {
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    } catch (err) {
      console.error('Error saving registered users:', err);
    }
  };

  // Helper function to check if email already exists
  const isEmailExists = (email) => {
    const users = getRegisteredUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  };

  // Login function - validate against registered users
  const login = (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const registeredUsers = getRegisteredUsers();
      const foundUser = registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create session user (without password)
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        token: `token_${Date.now()}`,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', userData.token);
      setIsLoading(false);
      return userData;
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  // Signup function - register new user
  const signup = (firstName, lastName, email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (isEmailExists(email)) {
        throw new Error('Email already registered. Please login or use a different email.');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        password, // Store password for validation
        provider: 'email',
        createdAt: new Date().toISOString(),
      };

      // Add to registered users
      const registeredUsers = getRegisteredUsers();
      registeredUsers.push(newUser);
      saveRegisteredUsers(registeredUsers);

      // Create session user (without password)
      const userData = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        token: `token_${Date.now()}`,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', userData.token);
      setIsLoading(false);
      return userData;
    } catch (err) {
      const errorMessage = err.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  // Social login function - auto register if not exists
  const socialLogin = (provider, email, firstName, lastName) => {
    setError(null);
    setIsLoading(true);
    try {
      let foundUser = null;
      const registeredUsers = getRegisteredUsers();

      // Check if user exists
      foundUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!foundUser) {
        // Auto-register social user
        foundUser = {
          id: Date.now().toString(),
          email,
          firstName: firstName || email.split('@')[0],
          lastName: lastName || 'User',
          provider,
          password: `social_${provider}`, // Placeholder for social users
          createdAt: new Date().toISOString(),
        };
        registeredUsers.push(foundUser);
        saveRegisteredUsers(registeredUsers);
      }

      // Create session user
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        provider: foundUser.provider,
        token: `token_${Date.now()}_${provider}`,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', userData.token);
      setIsLoading(false);
      return userData;
    } catch (err) {
      const errorMessage = `${provider} login failed. Please try again.`;
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  // Update user profile
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    socialLogin,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
