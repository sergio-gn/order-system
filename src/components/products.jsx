import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/store";
import { TiShoppingCart } from "react-icons/ti";

function Products({ filteredProducts }) {
  const dispatch = useDispatch();
  const [disabledButtons, setDisabledButtons] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setDisabledButtons((prev) => ({ ...prev, [product.id]: true }));
  };

  return (
    <div className="products">
      {filteredProducts.map((product) => (
        <div className="product-solo" key={product.id}>
        {product.price && product.promoprice ? (
          <div className="promo-badge">
            {((parseFloat(product.price) - parseFloat(product.promoprice)) / parseFloat(product.price) * 100).toFixed(2).substring(0, 2)}%
          </div>
        ) : (
          ""
        )}
          <div className="product-name medium-font bold t-center">
            {product.name}
          </div>
          <div className="small-font">
            Cod: {product.codigo}
          </div>
          <div className="d-center">
            {product.indisponivel === undefined || product.indisponivel === false ? (
              <div>
                {product.price !== undefined && (
                  <>
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
                  </>
                )}
              </div>
            ) : "Indisponivel"}
          </div>
          {product.indisponivel === undefined || product.indisponivel === false ? (
            <button
              className="cart_button"
              onClick={() => handleAddToCart(product)}
              disabled={disabledButtons[product.id]}
            >
              <TiShoppingCart />
              Adicionar
            </button>
          ) : <button disabled>Indisponivel</button>}
        </div>
      ))}
    </div>
  );
}

export default Products;