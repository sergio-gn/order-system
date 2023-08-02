import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../utils/store';

function groupCartItems(cartItems) {
  // Create an object to store the count of each product name
  const countMap = {};

  // Loop through the cart items and count the occurrences of each product name
  cartItems.forEach((item) => {
    const { id, name } = item;
    if (!countMap[name]) {
      countMap[name] = { ...item, quantity: 1 };
    } else {
      countMap[name] = { ...item, quantity: countMap[name].quantity + 1 };
    }
  });

  // Return an array of grouped cart items
  return Object.values(countMap);
}

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const groupedCartItems = groupCartItems(cartItems); // Group the cart items

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container cart-container">
      <h1>Cart Page</h1>
      <div>
        <h2>Your Cart</h2>
        {groupedCartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-wrapper">
            {groupedCartItems.map((product) => (
              <div className="product-solo" key={product.id}>
                <div>
                  {product.name} {product.quantity > 1 && `x${product.quantity}`} {/* Show the count if quantity is greater than 1 */}
                </div>
                {product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}
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