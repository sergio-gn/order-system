import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <>
      <h1>Cart Page</h1>
      <div>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((product) => (
              <li key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Cart;