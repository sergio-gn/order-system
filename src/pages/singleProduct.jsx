import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QuantityInput from '../components/ui/quantityInput';
import AddToCartButton from '../components/ui/addToCartButton';

function SingleProduct() {
  const { productCode } = useParams();
  const [quantity, setQuantity] = useState(1);
  const products = useSelector(state => state.products.products);
  const product = products.find(product => product.code === productCode);
  const [clickedCart, setClickedCart] = useState(false);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
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
    </div>
  );
}

export default SingleProduct;