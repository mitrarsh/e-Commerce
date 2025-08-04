import { useContext } from "react";
import Slider from "react-slick";
import { ItemContext } from "../../context/itemsContext";

import { useRef } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ItemLike from "../components/ItemLike";
import StarRating from "../components/StartsRating";

const OnsaleSection = ({ onAddToCart, CountDown }) => {
  const { items } = useContext(ItemContext);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };


  if (!Array.isArray(items)) {
    return <div>Loading...</div>; // Or null, or a spinner
  }
  return (
    <div className="block all-products-block">
      <div className="block-heading">
        <div className="block-block"></div>
        <h4>Today's</h4>
      </div>
      <div className="block-title">
        <h2>Flash Sales</h2>
        <div className="flash-sales-timer">
          <div className="days">
            <span>Days</span> <span>Hours</span> <span>Minutes</span>{" "}
            <span>Seconds</span>
          </div>
          {CountDown}
        </div>
        <div className="block-title-arrows">
          <div
            className="icon icon-graybg graybg-arrow-left"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <img src="src\assets\icons\arrow.svg" alt="" />
          </div>
          <div
            className="icon icon-graybg graybg-arrow-right"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img src="src\assets\icons\arrow.svg" alt="" />
          </div>
        </div>
      </div>
      {/* content */}
      {/* <div className="onsales-content"> */}
      <Slider ref={sliderRef} {...settings}>
        {items
          .filter((item) => item.discount)
          .map((item) => (
            <div key={item.id} className="block-content onsale-cards">
              <div className="item-card">
                <div className="cover">
                  <ItemLike item={item} />
                  <Link to={`products/${item.id}`}>
                    <div className="icon icon-whitebg cover-icon cover-icon-quick-view">
                      <img src="src\assets\icons\Quick View.svg" alt="" />
                    </div>
                  <div className="cover-tag tag-discount">-{item.discount}</div>
                  <div className="cover-image">
                    <img src={item.image} alt="" />
                  </div>
                  </Link>
                  <button className="add-btn" onClick={() => onAddToCart(item)}>
                    Add To Cart
                  </button>
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
            </div>
          ))}
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default OnsaleSection;
