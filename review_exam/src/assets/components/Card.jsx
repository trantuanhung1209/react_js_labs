import React, { memo } from "react";

const Card = memo(({ item }) =>{
  return (
    <>
      <div className="inner-card">
          <div className="inner-image">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="inner-info-product">
            <p>{item.name}</p>
            <p>{item.cuisine}</p>
            <p>{item.rating}</p>
            <p>{item.priceRange}</p>
            <p>{item.status}</p>
          </div>
        </div>
    </>
  );
});

export default Card;
