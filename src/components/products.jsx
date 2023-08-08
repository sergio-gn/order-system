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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openModal = (product) => {
    setIsOpen(true);
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  };
  return (
    <div className="products">
      {filteredProducts.map((product) => (
        <div className="product-solo" key={product.id}>
          {product.price && product.promoprice ? (
            <div className="promo-badge">
              {Math.floor(((parseFloat(product.price) - parseFloat(product.promoprice)) / parseFloat(product.price)) * 100)}%
            </div>
          ) : (
            ""
          )}
          <div className="image-product-wrapper">
            {product.photoUrl && <img className="product-photo" src={product.photoUrl} alt={product.name} />}
          </div>
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
                      R$: {product.price} {product.productMetric}
                    </div>
                      {product.promoprice && (
                        <div className="t-center">
                          <p className="medium-font promo-price bold">       
                            R$: {product.promoprice !== 0 ? product.promoprice : ''} {product.productMetric}
                          </p>
                        </div>
                      )}
                  </>
                )}
              </div>
            ) : "Indisponivel"}
          </div>

          {product.indisponivel === false ? (
            <button className="cart_button" onClick={() => openModal(product)}>
              <TiShoppingCart />
              Adicionar
            </button>
          ) : <button disabled>Indisponivel</button>}
        </div>
      ))}
      {isOpen && selectedProduct && (
              <div>
                <div className="darkBG" onClick={closeModal} />
                  <div className="centered">
                    <div className="modal">
                      <button className="closeBtn" onClick={closeModal}>
                        x
                      </button>
                      <div className="modalHeader">
                        <div className="heading">
                          {selectedProduct.name} <br></br>
                          {selectedProduct.codigo}
                        </div>
                      </div>
                      <div className="modalContent">
                        Quantidade: <input type="text"/>
                      </div>
                      <div className="modalActions">
                        <div className="actionsContainer">

                            <button
                              className="cart_button"
                              onClick={() => handleAddToCart(selectedProduct)}
                              disabled={disabledButtons[selectedProduct.id]}
                            >
                              <TiShoppingCart />
                              Adicionar
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      )}
    </div>
  );
}

export default Products;