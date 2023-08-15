import React from 'react';
import { connect } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';

const mapStateToProps = (state) => {
  return {
    cartCount: state.cart.cartItems.length,
  };
};

const CartLink = ({ cartCount }) => {
  return (
    <div to="/cart">
      <TiShoppingCart style={{ fontSize: "2.5rem" }} />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  );
};

export default connect(mapStateToProps)(CartLink);