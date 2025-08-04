import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../context/itemsContext";
import ItemLike from "../components/ItemLike";
import StarRating from "../components/StartsRating";

const AllProducts = ({ onAddToCart }) => {
  const { items } = useContext(ItemContext);
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 8);

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
    <div className="block all-products-block" layout>
      <div className="block-heading">
        <div className="block-block"></div>
        <h4>Our Products</h4>
      </div>
      <div className="block-title">
        <h2>Explore Our Products</h2>
      </div>
      {/* content */}
      <motion.div
        className="all-products-content"
        layout
        variants={containerVariants}
          initial="hidden"
  animate="show"
      >
        <AnimatePresence>
          {visibleItems.map((item) => (
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
                  <Link to={`products/${item.id}`}>
                    <div className="icon icon-whitebg cover-icon cover-icon-quick-view">
                      <img src="src\assets\icons\Quick View.svg" alt="" />
                    </div>
                  {item.new ? (
                    <div className="cover-tag tag-new">New</div>
                  ) : null}
                  <div className="cover-image">
                    <img src={item.image} />
                  </div>
                  </Link>
                  <button onClick={() => onAddToCart(item)} className="add-btn">
                    Add To Cart
                  </button>
                </div>
                <h2>{item.name}</h2>
                <div className="rating all-products-rating">
                  <p className="price ">${item.price}</p>
                  <div className="stars all-products-stars">
                    <StarRating rating={item.rating} />
                    <p className="raters">({item.reviews})</p>
                  </div>
                </div>
                {item.colours && item.colours.length > 0 && (
                  <div className="all-products-colors">
                    <div
                      className="color-box"
                      style={{ backgroundColor: item.colours[0] }}
                    ></div>
                    <div className="red-box"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <button className="btn red-btn" onClick={() => setShowAll(!showAll)}>
        View All Products
      </button>
    </div>
  );
};

export default AllProducts;
