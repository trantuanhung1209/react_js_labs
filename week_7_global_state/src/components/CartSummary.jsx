import React from 'react';
import { useCart } from '../hooks/useCart';
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';

function CartSummary() {
  const { cart, getTotalPrice, getTotalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const auth = useRecoilValue(authState);

  if (!auth.isLoggedIn) {
    return <div style={{ padding: '20px', color: '#999' }}>Please login to view cart</div>;
  }

  return (
    <div>
      <h3>Shopping Cart ({getTotalItems()} items)</h3>
      
      {cart.length === 0 ? (
        <p style={{ color: '#999' }}>Your cart is empty</p>
      ) : (
        <>
          <div style={{ marginTop: '20px' }}>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '10px',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{item.title}</p>
                  <p style={{ margin: '0', color: '#666' }}>${item.price.toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            textAlign: 'right'
          }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
              Total: ${getTotalPrice().toFixed(2)}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={clearCart}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartSummary;
