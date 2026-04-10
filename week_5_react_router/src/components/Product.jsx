import React from 'react'
import { Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Iphone' },
    { id: 2, name: 'Samsung' },
    { id: 3, name: 'Laptop' }
  ];

function Product() {
  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Product
