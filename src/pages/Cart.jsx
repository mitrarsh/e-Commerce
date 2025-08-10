import { useContext, useEffect } from "react";
import { ItemContext } from "../context/itemsContext";

const Cart = () => {

const currentUser= JSON.parse(localStorage.getItem("currentUser"))|| null;
const{cartItems: contextCartItems} = useContext(ItemContext);


  const cartItems = currentUser
    ? currentUser.cart || []
    : contextCartItems || [];

  return (
    <div>
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <div className="emty-msg">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-section">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>
            {cartItems.map((item) => (
              <div className="cart-section" key={item.id}>
                <div className="cart-item">
                  <img src={item.image} style={{ width: "5rem" }} />
                  <span>{item.name}</span>
                </div>
                <div>{`$${item.price}`}</div>
                <div>{item.quantity}</div>
                <div>{`$${item.price * item.quantity}`}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
