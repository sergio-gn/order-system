import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/store";
import { TiShoppingCart } from "react-icons/ti";

function Products({ filteredProducts }) {
  const dispatch = useDispatch();
  const [disabledButtons, setDisabledButtons] = useState({}); // Local state to track disabled status for each product

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setDisabledButtons((prev) => ({ ...prev, [product.id]: true })); // Disable the clicked button
  };

  filteredProducts.forEach((product) => {
    console.log("Promo Price:", product.promoprice);
  });
  
  return (
    <div className="products">
      {filteredProducts.map((product) => (
        <div className="product-solo" key={product.id}>
          <div className="product-name medium-font bold t-center">
            {product.name}
          </div>
          <div className="small-font">
            Cod: {product.codigo}
          </div>
          <div className="d-center">
            <div className={`bold medium-font ${product.promoprice ? "unactive-price" : ""}`}>
              R$: {product.price}
            </div>
            {product.promoprice && (
              <div className="t-center">
                <p className="medium-font promo-price bold">
                R$: {product.promoprice !== 0 ? product.promoprice : ''}

                </p>
              </div>
            )}
          </div>
          <button
            className="cart_button"
            onClick={() => handleAddToCart(product)}
            disabled={disabledButtons[product.id]}
          >
            <TiShoppingCart />
            Adicionar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;