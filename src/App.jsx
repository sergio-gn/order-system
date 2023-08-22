// general react
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
//firebase
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { provider, auth } from "./utils/firebaseconfig";
//redux
import { Provider } from "react-redux";
import store from "./utils/store";
//pages
import Profile from './pages/Profile';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SingleProduct from './pages/singleProduct';
//components
import CartLink from "./components/ui/cartLink";
import Logged from './components/ui/logged';
//assets
import Logo from "./assets/easycart.svg";
import { TiUser, TiHome} from "react-icons/ti";
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [user, setUser] = useState(null);
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }
  useEffect(() => {
    setValue(localStorage.getItem('email'))
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <Router className="navbar">
        <div className="header">
          <nav className="nav-class container">
            <Link className="linklogo" to="/">
              <div className="logo">
                <img src={Logo} alt="Logo" />
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
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:productCode" element={<SingleProduct />} />
        </Routes>
      </Router>
      <div className="footer">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </Provider>
  );
}

export default App;