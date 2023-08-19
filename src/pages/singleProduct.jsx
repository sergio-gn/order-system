import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const { productId } = useParams();
  const products = useSelector(state => state.products.products);

  // Find the product with the matching productId
  const product = products.find(product => product.codigo === productId);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    </div>
  );
}

export default SingleProduct;
