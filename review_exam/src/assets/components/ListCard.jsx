import React, { memo } from "react";
import Card from "./Card";

const ListCard = memo(({ data }) => {


  return (
    <>
      <div className="list-products">
        {data.map((item) => (
          <Card item={item} key={item.id}/>
        ))}
      </div>
    </>
  );
});

export default ListCard;
