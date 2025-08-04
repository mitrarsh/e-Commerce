import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import ItemLike from "./../html/components/ItemLike";
import StarRating from "./../html/components/StartsRating";

const SearchResults = ({ items }) => {
  const [params] = useSearchParams();
  const query = params.get("q");

  if (!items) return <p>Loading items...</p>;

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

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
    <motion.div
      className="all-products-content search-results-page"
      layout
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {filtered.map((item) => (
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
    </motion.div>
  );
};

export default SearchResults;
