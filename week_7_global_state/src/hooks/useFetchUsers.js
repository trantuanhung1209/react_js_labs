import { useRecoilState } from "recoil";
import { userState } from "../atoms/userState";

export function useFetchUsers() {
  const [users, setUsers] = useRecoilState(userState);

  // Lấy tất cả users khi component mount
  const fetchAllUsers = async () => {
    setUsers(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(prev => ({ 
        ...prev, 
        allUsers: data, 
        searchResults: data,
        loading: false, 
        error: null 
      }));
    } catch (error) {
      setUsers(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };

  // Search users theo keyword
  const searchUsers = async (keyword) => {
    if (!keyword.trim()) {
      // Nếu keyword rỗng, hiển thị tất cả users
      setUsers(prev => ({ 
        ...prev, 
        keyword: '',
        searchResults: prev.allUsers,
        loading: false
      }));
      return;
    }

    setUsers(prev => ({ ...prev, keyword, loading: true }));
    try {
      // Gọi API để search (JSONPlaceholder không hỗ trợ search, nên ta filter client-side)
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      // Filter kết quả theo keyword
      const filtered = data.filter(user => 
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase()) ||
        user.username.toLowerCase().includes(keyword.toLowerCase())
      );

      setUsers(prev => ({ 
        ...prev, 
        keyword,
        searchResults: filtered,
        allUsers: data,
        loading: false, 
        error: null 
      }));
    } catch (error) {
      setUsers(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message,
        searchResults: []
      }));
    }
  };

  return { fetchAllUsers, searchUsers };
}

