import React from "react";

function Products({ filteredProducts, addToCart }) {
  return (
    <div className="products">
      {filteredProducts.map((product) => (
        <div className="product-solo" key={product.id}>
          <div>{product.codigo}</div>
          <div>{product.name}</div>
          <div className="price">{product.price}</div>
          <button className="cart_button" onClick={addToCart}>Adicionar</button>
        </div>
      ))}
    </div>
  );
}
export default Products;