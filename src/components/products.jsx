import React from "react";

function Products({ products }) {
  return (
    <div className="grid-products">
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default Products;
