import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;