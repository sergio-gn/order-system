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

export const calculateTotalPriceAndQuantity = (cartItems, quantities) => {
  const result = cartItems.reduce((accumulator, item) => {
    const itemPrice = item.promoprice || item.price;
    const qtd = quantities[item.id];
    const itemTotal = itemPrice * qtd;
    
    return {
      total: accumulator.total + itemTotal,
      quantity: accumulator.quantity + qtd
    };
  }, { total: 0, quantity: 0 });

  return {
    total: result.total.toFixed(2),
    qtd: result.quantity
  };
};

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const quantities = useSelector(state => state.cart.quantities);
  const { total, qtd } = calculateTotalPriceAndQuantity(cartItems, quantities);
  const groupedCartItems = groupCartItems(cartItems);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const generateMessage = (cartItems) => {
    const message = cartItems.map(
      (product) => `${product.name} - Price: ${product.promoprice ? product.promoprice : product.price} - Qtd: ${qtd} Codigo: ${product.codigo}`
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
                  <div>Quantidade: {qtd} </div>
                  <div className="d-flex t-center justify-center"><div>Preço:</div>{product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}</div>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove Item</button>
              </div>
            ))}
          </div>
        )}
        <div className="t-center">Preço Total: {total}</div>
      </div>
      <form id="hiddenForm" action={`https://formsubmit.co/${import.meta.env.VITE_EMAIL_FORM}`} method="POST">
        <input type="hidden" name="text" value={generateMessage(cartItems)} />
        <button type="submit">Enviar Pedido</button>
      </form>
      <GeneratePDFLink qtd={qtd} cartItems={cartItems} />
    </div>
  );
}

export default Cart;