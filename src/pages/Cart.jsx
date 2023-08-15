import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../utils/store';
import GeneratePDFLink from '../components/pdfFeature/generatePdfLink';

function groupCartItems(cartItems) {
  const countMap = {};
  cartItems.forEach(item => {
    const { name } = item;
    if (!countMap[name]) {
      countMap[name] = { ...item, quantity: 1 };
    } else {
      countMap[name] = { ...item, quantity: countMap[name].quantity + 1 };
    }
  });
  // Return an array of grouped cart items
  return Object.values(countMap);
}

export const calculateTotalPrice = (cartItems, quantities) => {
  return cartItems.reduce((total, item) => {
    const itemPrice = item.promoprice || item.price;
    return total + itemPrice * quantities[item.id]
  }, 0).toFixed(2);;
};

function Cart() {
  const accumulatedQuantity = (product) => {
    return cartItems.reduce((acc, item) => {
      if (item.id === product.id) {
        return acc + quantities[item.id];
      }
      return acc;
    }, 0);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantities = useSelector(state => state.cart.quantities);
  const groupedCartItems = groupCartItems(cartItems);
  const dispatch = useDispatch();
  const totalPrice = calculateTotalPrice(cartItems, quantities);
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const generateMessage = (cartItems) => {
    const message = cartItems.map(
      (product) => `${product.name} - Price: ${product.promoprice ? product.promoprice : product.price} - Codigo: ${product.codigo}`
    );
    return message.join('\n');
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
                <div className="t-center">
                  <div>{product.name}</div>
                  <div>Quantidade: {accumulatedQuantity(product)}</div>
                  <div className="d-flex t-center justify-center"><div>Preço:</div>{product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}</div>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove Item</button>
              </div>
            ))}
          </div>
        )}
        <div className="t-center">Preço Total: {totalPrice}</div>
      </div>
      <form id="hiddenForm" action={`https://formsubmit.co/${import.meta.env.VITE_EMAIL_FORM}`} method="POST">
        <input type="hidden" name="text" value={generateMessage(cartItems)} />
        <button type="submit">Enviar Pedido</button>
      </form>
      <GeneratePDFLink cartItems={cartItems} quantities={quantities} />
    </div>
  );
}

export default Cart;