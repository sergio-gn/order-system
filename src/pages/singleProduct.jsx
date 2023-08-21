import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../utils/store";
import QuantityInput from '../components/ui/quantityInput';
import AddToCartButton from '../components/ui/addToCartButton';

function SingleProduct() {
  const { productCode } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [quantity, setQuantity] = useState(1);
  const [clickedCart, setClickedCart] = useState(false);
  useEffect(() => {
    // Fetch products if not already fetched
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products.find((product) => product.code === productCode);

  return (
    <div className="container">
      {product ? (
      <div className="card-singleProduct">
        <div className="d-center justify-center">
          <div className="image-product-wrapper">
            {product.photoUrl && <img className="product-photo" src={product.photoUrl} alt={product.name} />}
          </div>
        </div>
        <div className="d-center justify-center flex-direction-column">
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <p>{product.code}</p>
          <p>{product.description}</p>
          <QuantityInput
            quantity={quantity}
            onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
          />
          <AddToCartButton
            product={product}
            quantity={quantity}
            onClick={() => setClickedCart(true)}
          />
          {clickedCart  ?
            <div className="modalAfterClick">
              <Link to="/cart">
                <button >Ir Para o Carrinho</button>
              </Link>
              <Link to="/">
                <button >Continuar Comprando</button>
              </Link>
            </div>
          : ""}
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleProduct;