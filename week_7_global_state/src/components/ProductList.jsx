import React from 'react';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../atoms/cartState';

const PRODUCTS = [
  { id: 1, name: 'Apple', price: 10 },
  { id: 2, name: 'Banana', price: 5 },
  { id: 3, name: 'Orange', price: 8 },
];

function ProductList() {
  const setCart = useSetRecoilState(cartState);

  const handleAdd = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {PRODUCTS.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button style={{ marginLeft: '10px' }} onClick={() => handleAdd(p)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList;
