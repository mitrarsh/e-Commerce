import { useContext, useState } from "react";
import { ItemContext } from "../../context/itemsContext";
import ItemLike from "../components/ItemLike";
import StarRating from "../components/StartsRating";
import { Link } from "react-router-dom";


const AllProducts = ({onAddToCart}) => {
  const {items} = useContext(ItemContext);
  const [showAll, setShowAll]= useState(false);
  const visibleItems= showAll? items: items. slice(0,8);

  return (
    <div className="block all-products-block">
      <div className="block-heading">
        <div className="block-block"></div>
        <h4>Our Products</h4>
      </div>
      <div className="block-title">
        <h2>Explore Our Products</h2>
      </div>
      {/* content */}
      <div className="all-products-content">
        {visibleItems.map((item) => (
          <div key={item.id} className="block-content all-products-cards">
            <div className="item-card">
              <div className="cover">
                <ItemLike item={item} />
                <Link to={`products/${item.id}`}>
                  <div className="icon icon-whitebg cover-icon cover-icon-quick-view">
                  <img src="src\assets\icons\Quick View.svg" alt="" />
                </div>
                </Link>
                {item.new ? <div className="cover-tag tag-new">New</div> : null}
                <div className="cover-image">
                  <img src={item.image} />
                </div>
                <button
                  onClick={()=>onAddToCart(item)}
                  className="add-btn"
                >
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
          </div>
        ))}
      </div>
      <button className="btn red-btn"
      onClick={()=>setShowAll(!showAll)}>View All Products</button>
    </div>
  );
};

export default AllProducts;
