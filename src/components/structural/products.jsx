import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TiShoppingCart, TiArrowBack } from "react-icons/ti";
import { Link } from 'react-router-dom';
import QuantityInput from '../ui/quantityInput';
import AddToCartButton from "../ui/addToCartButton";

function Products({ filteredProducts }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [clickedCart, setClickedCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

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
    setClickedCart(false);
    setQuantity(1);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return (
    <div>
      <div className="products">
        {filteredProducts.slice(startIndex, endIndex).map((product) => (
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
              Cod: {product.code}
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

              <button className="go_to_product_button">
                <Link to={`/product/${product.code}`}>Detalhes</Link>
              </button>
          </div>
        ))}
      </div>
      <div className="page-counter">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button 
            className="page-counter_button"
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
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
                    {selectedProduct.code}
                  </div>
                </div>
                <div className="modalContent">
                  <QuantityInput
                    quantity={quantity}
                    onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
                  />
                </div>
                <div className="modalActions">
                  <div className="actionsContainer">
                    <AddToCartButton
                      product={selectedProduct}
                      quantity={quantity}
                      onClick={() => setClickedCart(true)}
                    />
                  </div>
                </div>
                {clickedCart  ?
                  <div className="modalAfterClick">
                    <Link to="/cart">
                      <button className="go-to_cart" onClick={closeModal}>
                        Ir para o carrinho <TiShoppingCart />
                      </button>
                    </Link>
                    <button className="keep_buying" onClick={closeModal}>
                      Continuar comprando <TiArrowBack />
                    </button>
                  </div>
                : ""}
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Products;