import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../context/itemsContext";
import ItemLike from "./../html/components/ItemLike";
import StarRating from "./../html/components/StartsRating";
import { q } from "framer-motion/client";

const Wishlist = ({ items }) => {
  if (!items) return <p>Loading items...</p>;
  const { setLikedItems, likedItems } = useContext(ItemContext);
  const { cartItems, setCartItems } = useContext(ItemContext);

  const handleAddAllToCart = ()=>{
    if(likedItems){
      for (let i of likedItems){
            setCartItems(prev=>prev.some(item=>item.id===i.id)? prev: [...prev, i])
      }
      setLikedItems([])
    }
  }
  

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h3 className="wishlist-heading">
        Wishlist {likedItems.length !== 0 ? `(${likedItems.length})` : null}
      </h3>
      <button className="wishlist-btn"
      onClick={handleAddAllToCart}>Move All to Cart</button>
      </div>
      {likedItems.length===0? (<p className="emty-msg">Your wishlist is empty.</p>):
      <motion.div
        className="all-products-content"
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {likedItems.map((item) => (
          <motion.div
            key={item.id}
            className="block-content all-products-cards"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
          >
            <div className="item-card">
              <div className="cover">
                <ItemLike item={item} />
                <Link to={`/products/${item.id}`}>
                  <div className="icon icon-whitebg cover-icon cover-icon-quick-view">
                    <img src="src\assets\icons\Quick View.svg" alt="" />
                  </div>
                  <div className="cover-tag tag-discount">-{item.discount}</div>
                  <div className="cover-image">
                    <img src={item.image} alt="" />
                  </div>
                </Link>
                <button className="add-btn">Add To Cart</button>
              </div>
              <h2>{item.name}</h2>
              <div className="card-price">
                <p className="price">${item.price}</p>
                <p className="prev-price">${item.originalPrice}</p>
              </div>
              <div className="rating">
                <div className="stars">
                  <StarRating rating={item.rating} />
                  <p className="raters">({item.reviews})</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>}
    </div>
  );
};

export default Wishlist;
