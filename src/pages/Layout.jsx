import { Outlet, useSubmit } from "react-router-dom";
import Footer from "../html/sections/Footer";
import NavContainer from "../html/sections/nav-container";
import { ItemContext } from "../context/itemsContext";
import { useContext } from "react";

const RootLayout = () => {
  const { items, cartItems, setCartItems } = useContext(ItemContext);


  const handleRemoveFromCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    const newCartItems = [...cartItems];
    if (cartItems.filter((i) => i.id === item.id).length > 1) {
      if (index !== -1) newCartItems.splice(index, 1);
      setCartItems(newCartItems);
    } else {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  return (
    <div>
      <>
        <header>
          <NavContainer onDeleteFromCart={handleRemoveFromCart}/>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    </div>
  );
};

export default RootLayout;
