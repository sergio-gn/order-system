import React from "react";

function Products({ products }) {
  return (
    <div className="grid-products">
        {products.map((product) => (
          <div className="product-solo">
              <div key={product.id}>{product.name}</div>
              <div key={product.id}>{product.price}</div>
          </div>
        ))}
    </div>
  );
}

export default Products;
