import React, { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';
import { useSetRecoilState } from 'recoil';
import { notificationsState } from '../atoms/notificationsState';

function ProductCatalog() {
  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const auth = useRecoilValue(authState);
  const setNotifications = useSetRecoilState(notificationsState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!auth.isLoggedIn) {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: 'Please login to add items to cart',
        type: 'warning',
      }]);
      return;
    }

    addToCart(product);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: `Added "${product.title}" to cart`,
      type: 'success',
    }]);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: '#f00' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Product Catalog</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '10px'
              }}
            />
            <h4 style={{ margin: '0 0 10px 0' }}>{product.title}</h4>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={!auth.isLoggedIn}
              style={{
                padding: '8px 16px',
                backgroundColor: auth.isLoggedIn ? '#2196F3' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: auth.isLoggedIn ? 'pointer' : 'not-allowed',
                marginTop: 'auto'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
