import { useParams, useNavigate } from 'react-router-dom';
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  function handleAddToCart() {
    // Thêm vào cart (giả lập)
    navigate(`/dashboard/carts/${id}`);
  }
  return (
    <div>
      <h2>Product Detail {id}</h2>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}