import React from "react";

function Products({ filteredProducts }) {
  return (
    <div className="grid-products">
      {filteredProducts.map((product) => (
        <div className="product-solo" key={product.id}>
          <div>{product.name}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </div>
  );
}
export default Products;