import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../atoms/cartState';

function Cart() {
  const [cart, setCart] = useRecoilState(cartState);

  const handleInc = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }

  const handleDec = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i));
  }

  const handleRemove = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) return <p>Cart is empty.</p>

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {cart.map(i => (
          <li key={i.id}>
            {i.name} - ${i.price} x {i.quantity}
            <button onClick={() => handleInc(i.id)} style={{ marginLeft: 8 }}>+</button>
            <button onClick={() => handleDec(i.id)}>-</button>
            <button onClick={() => handleRemove(i.id)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
    </div>
  )
}

export default Cart;
