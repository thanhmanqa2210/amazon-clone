import React from "react";
import "../assets/css/header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../components/Provider/StateProvider";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
function Header() {
  const [{ basket, user }] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo amazon"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__search--input" />
        <SearchIcon className="header__search--icon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"} className="link">
          <div className="header__nav__option" onClick={handleAuthentication}>
            <span className="header__nav__option__lineOne">
              Hello {user ? user.email : "Guest"}
            </span>
            <span className="header__nav__option__lineTwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to="orders" className="link">
          <div className="header__nav__option">
            <span className="header__nav__option__lineOne">Returns</span>
            <span className="header__nav__option__lineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__nav__option">
          <span className="header__nav__option__lineOne">Your</span>
          <span className="header__nav__option__lineTwo">Prime</span>
        </div>
        <div className="header__nav__optionBasket">
          <Link to="/checkout">
            <ShoppingBasketIcon className="shopping_basket" />
          </Link>
          <div className="header__nav__optionBasket__count">
            {basket?.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
