import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../utils/store';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../components/PdfDocument';

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

const GeneratePDFLink = ({ cartItems }) => {
  const pdfData = (
    <PDFDocument cartItems={cartItems} />
  );
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Provide the PDFDownloadLink component with the PDF blob data
  return (
    <PDFDownloadLink 
      className="cart-pdflink"
      document={pdfData}
      fileName="cart.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
};

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const groupedCartItems = groupCartItems(cartItems); // Group the cart items

  const dispatch = useDispatch();

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
                <div>
                  {product.name} {product.quantity > 1 && `x${product.quantity}`}
                </div>
                {product.promoprice ? (<div className="promo-price">{product.promoprice}</div>) : <div>{product.price}</div>}
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove Item</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <form id="hiddenForm" action={`https://formsubmit.co/${import.meta.env.VITE_EMAIL_FORM}`} method="POST">
        <input type="hidden" name="text" value={generateMessage(cartItems)} />
        <button type="submit">Enviar Pedido</button>
      </form>
      <GeneratePDFLink cartItems={cartItems} />
    </div>
  );
}

export default Cart;