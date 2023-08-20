import React, { useState } from 'react';

function QuantityInput({ quantity, onQuantityChange }) {
  return (
    <div className="d-center justify-center gap-1">
      <span>Quantidade:</span>
      <input
        className="input-quantity"
        placeholder="0"
        type="number"
        value={quantity}
        onChange={(e) => {
          const inputQuantity = parseInt(e.target.value);
          if (!isNaN(inputQuantity) && inputQuantity > 0) {
            onQuantityChange(inputQuantity.toString());
          } else {
            onQuantityChange('');
          }
        }}
      />
    </div>
  );
}

export default QuantityInput;