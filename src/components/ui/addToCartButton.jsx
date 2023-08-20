import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../utils/store';
import { TiShoppingCart } from 'react-icons/ti';

function AddToCartButton({ product, quantity, disabled, onClick }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    // You can add the disabled and clickedProducts logic here if needed
  };
  const handleButtonClick = () => {
    handleAddToCart();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="cart_button" onClick={handleButtonClick} disabled={disabled}>
      <TiShoppingCart />
      Adicionar
    </button>
  );
}

export default AddToCartButton;
