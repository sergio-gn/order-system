import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/store";

function Products({ filteredProducts }) {
  const dispatch = useDispatch();
  const [disabledButtons, setDisabledButtons] = useState({}); // Local state to track disabled status for each product

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setDisabledButtons((prev) => ({ ...prev, [product.id]: true })); // Disable the clicked button
  };

  return (
    <div className="products">
      {filteredProducts.map((product) => (
        <div className="product-solo" key={product.id}>
          <div>{product.codigo}</div>
          <div>{product.name}</div>
          <div className="price">{product.price}</div>
          <button
            className="cart_button"
            onClick={() => handleAddToCart(product)}
            disabled={disabledButtons[product.id]} // Set the button disabled status based on local state
          >
            Adicionar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;