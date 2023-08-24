import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../utils/store";
import QuantityInput from '../components/ui/quantityInput';
import AddToCartButton from '../components/ui/addToCartButton';

function SingleProduct() {
  // url 
  const { productCode } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  //components states
  const [quantity, setQuantity] = useState(1);
  const [clickedCart, setClickedCart] = useState(false);

  useEffect(() => {
    // Fetch products using fetchProducts function from REdux if not already fetched
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Find products based on the productCode
  const product = products.find((product) => product.code === productCode);

  return (
    <div className="container">
      {product ? (
      <div className="card-singleProduct">
        <div className="d-center flex-direction-column">
          <div className="d-flex justify-center">
            <div className="">
              <div className="image-product-wrapper">
                {product.photoUrl && <img className="product-photo" src={product.photoUrl} alt={product.name} />}
              </div>
              <h2>{product.name}</h2>
              <p>{product.code}</p>
            </div>
            <div className="">
              <p>{product.price}</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="singleProduct-actions">
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
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleProduct;