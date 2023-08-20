import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const { productCode } = useParams();
  const products = useSelector(state => state.products.products);
  const product = products.find(product => product.code === productCode);

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
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;