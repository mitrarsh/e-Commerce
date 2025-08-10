import { useContext, useState } from "react";
import { ItemContext } from "../context/itemsContext";

const Cart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const { cartItems: contextCartItems } = useContext(ItemContext);

  const cartItems = currentUser
    ? currentUser.cart || []
    : contextCartItems || [];

  const uniqueCartItems = cartItems.reduce((acc, cur) => {
    const isRepeatative = acc.find((i) => i.id === cur.id);
    if (isRepeatative) {
      isRepeatative.quantity += 1;
    } else {
      acc.push({ ...cur, quantity: 1 });
    }
    return acc;
  }, []);

  const [cartData, setCartData] = useState(uniqueCartItems);

  const handleIncrement = (id) => {
    setCartData((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: (i.quantity += 1) } : i))
    );
  };
  const handleDecrement = (id) => {
    setCartData((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: (i.quantity -= 1) } : i))
        .filter((i) => i.quantity > 0)
    );
  };
  const handleDeleteItem = (id)=>{
    setCartData(prev=>prev.filter(i=>i.id!==id))
  }

  const [deleteVisibleId, setDeleteVisibleIdx] = useState(null);

  return (
    <div>
      <div className="cart-page">
        {cartData.length === 0 ? (
          <div className="emty-msg">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-section cart-header">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>
            {cartData.map((item) => (
              <div
                className="cart-section"
                key={item.id}
                onMouseOver={() => setDeleteVisibleIdx(item.id)}
              >
                <div className="cart-item-pic">
                  <img
                    src={item.image}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      position: "relative",
                    }}
                  />
                  <div
                    className="delete-icon"
                    style={{ opacity: deleteVisibleId === item.id ? "1" : "0" }}
                    onClick={()=>handleDeleteItem(item.id)}
                  >
                    <img src="src/assets/icons/delete.svg" alt="" />
                  </div>
                  <span>{item.name}</span>
                </div>
                <div>{`$${item.price}`}</div>
                <div className="cart-item-quantity">
                  {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                  <div className="control-quantity">
                    <img
                      src="src/assets/icons/increment-icon.svg"
                      alt="increment"
                      onClick={() => handleIncrement(item.id)}
                    />
                    <img
                      src="src/assets/icons/decrement-icon.svg"
                      alt="decrement"
                      onClick={() => handleDecrement(item.id)}
                    />
                  </div>
                </div>
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
