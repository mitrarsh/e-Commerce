import { useContext, useEffect } from "react";
import { ItemContext } from "../context/itemsContext";

const Cart = () => {

const currentUser= JSON.parse(localStorage.getItem("currentUser"))|| null;
const{cartItems: contextCartItems} = useContext(ItemContext);


  const cartItems = currentUser
    ? currentUser.cart || []
    : contextCartItems || [];

  const uniqueCartItems= cartItems.reduce((acc, cur)=>{
  const isRepeatative= acc.find(i=>i.id===cur.id); 
  if (isRepeatative) {isRepeatative.quantity+=1} else {acc.push({...cur , quantity:1})}; return acc;
  },[])


  return (
    <div>
      <div className="cart-page">
        {uniqueCartItems.length === 0 ? (
          <div className="emty-msg">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-section">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>
            {uniqueCartItems.map((item) => (
              <div className="cart-section" key={item.id}>
                <div className="cart-item-pic">
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
