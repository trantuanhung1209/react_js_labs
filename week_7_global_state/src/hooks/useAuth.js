import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authState';

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  // Fake API login - thực tế sẽ gọi API thật
  const login = async (email, password) => {
    setAuth(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake response từ API
      if (email && password) {
        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const user = {
          id: 1,
          name: email.split('@')[0],
          email: email,
        };
        
        // Lưu vào localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        
        setAuth({
          isLoggedIn: true,
          user: user,
          token: token,
          loading: false,
          error: null,
        });
        
        return { success: true, token, user };
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      setAuth(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    setAuth({
      isLoggedIn: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  };

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    
    if (token && user) {
      setAuth({
        isLoggedIn: true,
        user: JSON.parse(user),
        token: token,
        loading: false,
        error: null,
      });
    }
  };

  // Gọi API với token
  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      throw new Error('No token found. Please login first.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error('Token expired. Please login again.');
        }
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      setAuth(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  return {
    login,
    logout,
    checkAuth,
    fetchWithAuth,
  };
};
