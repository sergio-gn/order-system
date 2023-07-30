import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../utils/store';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container cart-container">
      <h1>Cart Page</h1>
      <div>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-wrapper">
            {cartItems.map((product) => (
              <div className="product-solo" key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove Item</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Cart;