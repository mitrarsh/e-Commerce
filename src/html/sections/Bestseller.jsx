import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../context/itemsContext";
import ItemLike from "../components/ItemLike";
import StarRating from "../components/StartsRating";

const Bestseller = () => {
  const { items } = useContext(ItemContext);
  const [showAll, setShowAll] = useState(false);

  const bestsellers = items.filter((item) => item.rating >= 4.5);
  const visibleItems = showAll ? bestsellers : bestsellers.slice(0, 4);
  const containerVariant = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };
  return (
    <div className="block all-products-block">
      <div className="block-heading">
        <div className="block-block"></div>
        <h4>This Month</h4>
      </div>
      <div className="block-title">
        <h2>Best Selling Products</h2>
        <div className="">
          <button
            className="btn btn-red-small"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View All"}
          </button>
        </div>
      </div>
      {/* content */}
      <motion.div
        className="onsales-content"
        // layout
        // variants={containerVariant}
        // initial="hidden"
        // animate="shown"
      >
        <AnimatePresence>
          {visibleItems.map((item) => (
            <motion.div
              key={item.id}
              className="block-content onsale-cards"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="item-card">
                <div className="cover">
                  <ItemLike item={item} />
                  <Link to={`products/${item.id}`}>
                    <div className="icon icon-whitebg cover-icon cover-icon-quick-view">
                      <img src="src\assets\icons\Quick View.svg" alt="" />
                    </div>
                  <div className="cover-image">
                    <img src={item.image} alt="" />
                  </div>
                  </Link>
                </div>
                <h2>{item.name}</h2>
                <div className="card-price">
                  <p className="price">${item.price}</p>
                  <p className="prev-price">${item.originalPrice}</p>
                </div>
                <div className="rating">
                  <StarRating rating={item.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Bestseller;
