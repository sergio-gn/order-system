import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../utils/store';
import GeneratePDFLink from '../components/pdfFeature/generatePdfLink';

function groupCartItems(cartItems, quantities) {
  const countMap = {};
  cartItems.forEach(item => {
    const { id, name } = item;
    if (!countMap[id]) {
      countMap[id] = { ...item, quantity: quantities[id] || 0 }; // Use stored quantity
    } else {
      countMap[id] = { ...item, quantity: countMap[id].quantity + (quantities[id] || 0) };
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
  const groupedCartItems = groupCartItems(cartItems, quantities);
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
    <div className="container cart">
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
                  <div>Quantidade: {product.quantity} </div>
                  <div className="d-flex t-center justify-center"><div>Preço:</div>{product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}</div>
                  <button className="remove" onClick={() => handleRemoveFromCart(product.id)}>Remover</button>
                </div>
              ))}
            </>
          )}
          <div className="total-price t-center">Preço Total: {total}</div>
        </div>
      </div>
      <form id="hiddenForm" action={`https://formsubmit.co/${import.meta.env.VITE_EMAIL_FORM}`} method="POST">
        <input type="hidden" name="text" value={generateMessage(cartItems)} />
        <button className="submit-button" type="submit">Enviar Pedido</button>
      </form>
      <GeneratePDFLink qtd={qtd} cartItems={cartItems} />
    </div>
  );
}

export default Cart;