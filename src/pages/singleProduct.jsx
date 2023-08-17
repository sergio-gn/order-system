import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SingleProduct() {
  const { productId } = useParams();
//   console.log(productId)
//   const products = useSelector(state => state.products.products);
//     console.log(products);

//   const product = useSelector(state =>
//     state.products.products.find(product => product.id === productId)
//   );

//   if (!product) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h2>{productId}</h2>
    </div>
  );
}

export default SingleProduct;
