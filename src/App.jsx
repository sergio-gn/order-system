// general react
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
//pages
import Profile from './pages/Profile';
import Home from './pages/Home';
import Cart from './pages/Cart';
//components
import CartLink from "./components/cartLink";
import Logged from './components/logged';
//assets
import Tambasa from "./assets/TambasaFacil.svg";
import { TiUser, TiHome} from "react-icons/ti";
import './App.css';
//firebase
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { provider, auth } from "./firebaseconfig";
//redux
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  const [value, setValue] = useState('')
  const [uid, setUid] = useState(null);
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
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;