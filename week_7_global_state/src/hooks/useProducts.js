import { useSetRecoilState } from 'recoil';
import { atom, useRecoilState } from 'recoil';

// Tạo atom cho products
export const productsState = atom({
  key: 'productsState',
  default: {
    items: [],
    loading: false,
    error: null,
  },
});

export const useProducts = () => {
  const [products, setProducts] = useRecoilState(productsState);

  // Fetch products từ API (JSONPlaceholder)
  const fetchProducts = async () => {
    setProducts(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Giả lập API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake product data
      const mockProducts = [
        { id: 1, title: 'Laptop Dell', price: 899, image: 'https://via.placeholder.com/100?text=Laptop' },
        { id: 2, title: 'Mouse Logitech', price: 29, image: 'https://via.placeholder.com/100?text=Mouse' },
        { id: 3, title: 'Keyboard Mechanical', price: 149, image: 'https://via.placeholder.com/100?text=Keyboard' },
        { id: 4, title: 'Monitor 27"', price: 299, image: 'https://via.placeholder.com/100?text=Monitor' },
        { id: 5, title: 'Headphone Sony', price: 199, image: 'https://via.placeholder.com/100?text=Headphone' },
        { id: 6, title: 'Webcam HD', price: 79, image: 'https://via.placeholder.com/100?text=Webcam' },
      ];
      
      setProducts(prev => ({
        ...prev,
        items: mockProducts,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setProducts(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  return {
    products: products.items,
    loading: products.loading,
    error: products.error,
    fetchProducts,
  };
};
