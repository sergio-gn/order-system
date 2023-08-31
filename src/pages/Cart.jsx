import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from '../utils/store';
import GeneratePDFLink from '../components/pdfFeature/generatePdfLink';
import { groupCartItems, calculateTotalPriceAndQuantity, generateMessage } from '../utils/usefulFunctions';
import QuantityInput from "../components/ui/quantityInput";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantities = useSelector(state => state.cart.quantities);
  const { total: calculateTotal } = calculateTotalPriceAndQuantity(cartItems, quantities);
  const groupedCartItems = groupCartItems(cartItems, quantities);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (productId) => {dispatch(removeFromCart(productId));};
  const [productQuantities, setProductQuantities] = useState({});
  return (
    <div className="container cart main-content">
      <div>
        <h2>Carrinho</h2>
        <div className="cart-card">
          {groupedCartItems.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              {groupedCartItems.map((product) =>{
                const initialQuantity = productQuantities[product.id] || product.quantity;
                return (
                  <div className="cart-product" key={product.id}>
                    <div>{product.name}</div>
                    <div className="d-center justify-center gap-1">
                      <QuantityInput
                        quantity={initialQuantity}
                        onQuantityChange={(newQuantity) => {
                          const numericNewQuantity = parseInt(newQuantity, 10); // or parseFloat if dealing with decimals
                          if (!isNaN(numericNewQuantity)) {
                            setProductQuantities((prevQuantities) => ({
                              ...prevQuantities,
                              [product.id]: numericNewQuantity,
                            }));
                            dispatch(updateQuantity({ productId: product.id, quantity: numericNewQuantity }));
                          }
                        }}
                      />
                      <div>
                        {product.productMetric}
                      </div>
                    </div>
                    <div className="d-flex t-center justify-center"><div>Preço:</div>{product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}</div>
                    <button className="remove" onClick={() => handleRemoveFromCart(product.id)}>Remover</button>
                  </div>
                );
              })}
            </>
          )}
          <div className="total-price t-center">Preço Total: {calculateTotal}</div>
        </div>
      </div>
      <form id="hiddenForm" action={`https://formsubmit.co/${import.meta.env.VITE_EMAIL_FORM}`} method="POST">
        <input type="hidden" name="text" value={generateMessage(cartItems)} />
        <button className="submit-button" type="submit">Enviar Pedido</button>
      </form>
      <GeneratePDFLink groupedCartItems={groupedCartItems} calculateTotal={calculateTotal} />
    </div>
  );
}

export default Cart;