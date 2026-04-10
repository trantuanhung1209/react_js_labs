import { useNavigate, useParams } from 'react-router-dom';
export default function Cart() {
    const { id } = useParams();
  const navigate = useNavigate();
  function handleCheckout() {
    navigate(`/dashboard/checkout/${id}`);
  }
  return (
    <div>
      <h2>Cart</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}