import React from 'react'
import { useParams } from 'react-router-dom';

function Checkout() {
    const { id } = useParams(); 
  return (
    <div>
      Thanh toán thành công {id}
    </div>
  )
}

export default Checkout
