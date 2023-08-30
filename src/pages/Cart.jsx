import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../utils/store';
import GeneratePDFLink from '../components/pdfFeature/generatePdfLink';
import { groupCartItems, calculateTotalPriceAndQuantity, generateMessage } from '../utils/usefulFunctions';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantities = useSelector(state => state.cart.quantities);
  const { total: calculateTotal } = calculateTotalPriceAndQuantity(cartItems, quantities);
  const groupedCartItems = groupCartItems(cartItems, quantities);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (productId) => {dispatch(removeFromCart(productId));};
  return (
    <div className="container cart main-content">
      <div>
        <h2>Carrinho</h2>
        <div className="cart-card">
          {groupedCartItems.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              {groupedCartItems.map((product) => (
                <div className="cart-product" key={product.id}>
                  <div>{product.name}</div>
                  <div>Quantidade: {product.quantity} {product.productMetric} </div>
                  <div className="d-flex t-center justify-center"><div>Preço:</div>{product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}</div>
                  <button className="remove" onClick={() => handleRemoveFromCart(product.id)}>Remover</button>
                </div>
              ))}
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