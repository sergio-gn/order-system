import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { TiUser, TiHome, TiShoppingCart } from "react-icons/ti";

import { useState, useEffect } from "react";
import { provider, auth } from "./firebaseconfig";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import Logged from './components/logged';
import Tambasa from "./assets/TambasaFacil.svg";
import { CartProvider } from "./utils/cardContext"; // Import the CartProvider
import { Provider } from "react-redux"; // Import the Provider from react-redux
import store from "./utils/store"; // Import the Redux store

import CartLink from "./components/cartLink"

function App() {
  const [value, setValue] = useState('')
  const [uid, setUid] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }
  useEffect(() => {
    setValue(localStorage.getItem('email'))
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <CartProvider> 
        <Router className="navbar">
          <div className="header">
            <nav className="nav-class container">
              <Link className="linklogo" to="/">
                <div className="logo">
                  <img src={Tambasa} alt="Logo Tambasa" />
                </div>
              </Link>
              <ul>
                <li>
                  <Link to="/">
                    <TiHome style={{ fontSize: "2.5rem" }} />
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <CartLink />
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    {value ? <Logged /> : <button className="profile-button" onClick={handleClick}>
                      <TiUser style={{ fontSize: "2.5rem" }} />
                    </button>}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            <Route index path="/" element={<Home userId={uid} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </CartProvider>
    </Provider>
  );
}

export default App;
