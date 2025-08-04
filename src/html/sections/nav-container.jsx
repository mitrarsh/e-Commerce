import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ItemContext } from "../../context/itemsContext";
import SearchBar from './../components/SearchBar';

const NavContainer = ({ onDeleteFromCart }) => {
  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
    { label: "Sign Up", link: "/sign-up" },
  ];
  const [clickedIndex, setClickedIndex] = useState(null);
  const { likedItems, cartItems } = useContext(ItemContext);

  const [openDropboxId, setOpenDropboxId] = useState();
  function handleOpen(id) {
    const isOpen = openDropboxId === id;
    isOpen ? setOpenDropboxId(null) : setOpenDropboxId(id);
  }



  const {items} = useContext(ItemContext);

  const uniqueCartItems = [
    ...new Map(
      cartItems
        .filter((item) => item && item.id !== undefined)
        .map((item) => [item.id, item])
    ).values(),
  ];
  const { token, logout } = useAuth();

  const dropdownRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropboxId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <div className="nav">
        <img src="/assets/images/icons/Logo.svg" alt="" />
        <div className="nav-links">
          {navLinks.map((l, index) => (
            <Link
              key={index}
              to={l.link}
              onClick={() => setClickedIndex(index)}
              className={clickedIndex === index ? "link-clicked" : ""}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-options">
        <SearchBar items={items}/>
        <div
          className="nav-icon-container"
          id="like"
          onClick={() => {
            // setWishlistVisible(!wishlistVisible);
            handleOpen("like");
          }}
        >
          {likedItems.length === 0 ? (
            <div className="icon icon-whitebg nav-icon">
              <img src="/assets/images/icons/heart.svg" alt="" />
            </div>
          ) : (
            <div className="icon icon-whitebg">
              <img src="/assets/images/icons/heart.svg" alt="" />
              <div className="icon icon--tag">
                <p>{likedItems.length}</p>
              </div>
            </div>
          )}
          <AnimatePresence>
            {openDropboxId === "like" ? (
              <motion.div
                className="dropdown"
                ref={dropdownRef}
                initial={{ y: -30, opacity: 0 }}
                exit={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h3>My Wishlist</h3>
                {likedItems.length === 0 ? (
                  <p className="empty-cart">Your wishlist is empty</p>
                ) : (
                  likedItems.map((item) => {
                    return (
                      <ul key={item.id} className="cart-item">
                        <li className="cart-item-details">
                          <h4>{item.name}</h4>
                          <h4>${item.price}</h4>
                        </li>
                      </ul>
                    );
                  })
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div
          id="cart"
          className="nav-icon-container"
          onClick={() => {
            // setCartVisible(!cartVisible);
            handleOpen("cart");
          }}
        >
          {cartItems.length === 0 ? (
            <div className="icon icon-whitebg nav-icon">
              <img src="/assets/images/icons/Cart1.svg" alt="" />
            </div>
          ) : (
            <div className="icon icon-whitebg">
              <img src="/assets/images/icons/Cart1.svg" alt="" />
              <div className="icon icon--tag">
                <p>{uniqueCartItems.length}</p>
              </div>
            </div>
          )}
          <AnimatePresence>
            {openDropboxId === "cart" ? (
              <motion.div
                className="dropdown"
                ref={dropdownRef}
                id="cart"
                initial={{ y: -30, opacity: 0 }}
                exit={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h3>My Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  uniqueCartItems.map((item) => {
                    const quantity = cartItems
                      .filter((i) => i.id === item.id)
                      .reduce((sum, i) => sum + i.quantity, 0);

                    return (
                      <ul key={item.id} className="cart-item">
                        <motion.li className="cart-item-details" layout>
                          <h4>{item.name}</h4>
                          <h4>x{quantity}</h4>
                          <h4>${quantity * item.price}</h4>
                          <p
                            onClick={() => onDeleteFromCart(item)}
                            style={{ cursor: "pointer" }}
                          >
                            🗑️
                          </p>
                        </motion.li>
                      </ul>
                    );
                  })
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        {token ? (
          <div className="nav-icon-container">
            <img
              id="account"
              src="/assets/images/icons/user.svg"
              alt=""
              className="nav-icon"
              onClick={() =>
                // setAccountVisible(!accountVisible)
                handleOpen("account")
              }
            />
            <AnimatePresence>
              {openDropboxId === "account" ? (
                <motion.div
                  className="dropdown"
                  ref={dropdownRef}
                  initial={{ y: -30, opacity: 0 }}
                  exit={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Link className="cart-item-details" to={"user-account"}>
                    <img src="/assets/images/icons/user (1).svg" alt="" />
                    <h3>Manage My Account</h3>
                  </Link>
                  <Link className="cart-item-details">
                    <img src="/assets/images/icons/icon-mallbag.svg" alt="" />
                    <h3>My Order</h3>
                  </Link>
                  <Link className="cart-item-details">
                    <img src="/assets/images/icons/icon-cancel.svg" alt="" />
                    <h3>Account Dropdoen</h3>
                  </Link>
                  <Link className="cart-item-details">
                    <img src="/assets/images/icons/Icon-Reviews.svg" alt="" />
                    <h3>My Reviews</h3>
                  </Link>
                  <Link className="cart-item-details" onClick={logout}>
                    <img src="/assets/images/icons/Icon-logout.svg" alt="" />
                    <h3>Logout</h3>
                  </Link>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavContainer;
