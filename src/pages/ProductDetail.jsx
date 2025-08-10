import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ItemContext } from "../context/itemsContext";
import ItemLike from "../html/components/ItemLike";
import StarRating from "./../html/components/StartsRating";

const ProductDetail = () => {
  const { id } = useParams();
  const { items, cartItems, setCartItems } = useContext(ItemContext);

  const item = items.find((product) => String(product.id) === String(id));
  if (!item) return <div>item not found</div>;

  // const dispatch = useDispatch();
  // const number = useSelector((state) => state.quantity);

  // const incrementHandler = ()=>{
  //   dispatch({ type: 'increment' });
  // }
  // const decrementHandler = ()=>{
  //   dispatch({ type: 'decrement' });
  // }

  useEffect(() => {
    setActiveIndex(0);
    setFade(false);
    setClickedNegative(false);
    setClickedPositive(false);
    setItemColor(item?.colours?.[0] ?? null);
    setItemSize(item?.sizes?.[0] ?? null);
    setQuantity(0);
  }, [id]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const handlPicClick = (index) => {
    if (activeIndex === index) return;
    setFade(true);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(false);
    }, 500);
  };

  const [clickedNegative, setClickedNegative] = useState(false);
  const [clickedPositive, setClickedPositive] = useState(false);

  const relatedItems = items.filter(
    (i) => item.type === i.type && item.id !== i.id
  );
  const visibleItems = relatedItems.slice(0, 4);

  const { setLikedItems, likedItems } = useContext(ItemContext);
  const isLiked = likedItems.some((i) => i.id === item.id);

  const handleLike = () => {
    !isLiked
      ? setLikedItems([...likedItems, item])
      : setLikedItems(likedItems.filter((i) => i.id !== item.id));
  };

  const [itemColor, setItemColor] = useState(
    item.colours ? item.colours[0] : null
  );
  const [itemSize, setItemSize] = useState(item.sizes ? item.sizes[0] : null);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (item) => {
    if (quantity < 1) return;

    const existingItemIndex = cartItems.findIndex(
      (i) => i.id === item.id && i.color === itemColor && i.size === itemSize
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((i, index) => {
        if (index === existingItemIndex) {
          return { ...i, quantity: i.quantity + quantity };
        }
        return i;
      });
      setCartItems(updatedCart);
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        color: itemColor,
        size: itemSize,
        quantity: quantity,
        image: item.image,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  console.log(cartItems);
  return (
    <div className="main-content">
      <div className="product-detail">
        <div className="product-detail-imgs">
          <div
            className="product-detail-img preview-img img1"
            onClick={() => handlPicClick(0)}
          >
            <img src={item.image} alt="" />
          </div>
          <div
            className="product-detail-img preview-img img2"
            onClick={() => handlPicClick(1)}
          >
            <img src={item.image2} alt="" />
          </div>
          <div
            className={`product-detail-img img-display ${
              fade ? "fade-exit" : ""
            }`}
          >
            <img src={activeIndex === 0 ? item.image : item.image2} alt="" />
          </div>
        </div>
        <div className="product-detail-content">
          <h2>{item.name}</h2>
          <div className="rating">
            <div className="stars product-detail-content-stars">
              <StarRating rating={item.rating} />
              <p className="raters">({item.reviews} reviews)</p>
            </div>
          </div>
          <h1 className="product-detail-content-price">${item.price}</h1>
          <p className="product-detail-content-des">{item.description}</p>
          <div className="product-detail-content-des-color">
            <h1>Colours: </h1>
            {item.colours && item.colours.length > 0 && (
              <div className="all-products-colors">
                {item.colours.map((color, index) => (
                  <div
                    className={`colorBorder ${
                      itemColor === color ? "clicked" : ""
                    }`}
                    key={index}
                  >
                    <div
                      key={index}
                      className="color-box itemColor"
                      style={{ backgroundColor: color }}
                      onClick={() => setItemColor(color)}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="product-detail-content-des-color">
            {item.sizes && item.sizes.length > 1 && (
              <div className="all-products-colors">
                <h1>Size: </h1>
                {item.sizes.map((size, index) => (
                  <div
                    className={`size sizeBox ${
                      itemSize === size ? "clicked" : ""
                    }`}
                    key={index}
                    onClick={() => setItemSize(size)}
                  >
                    <p
                      className={`size-p ${itemSize === size ? "clicked" : ""}`}
                    >
                      {size}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="product-detail-content-btns">
            <div className="increment">
              <div
                className={`increment-div ${clickedNegative ? "clicked" : ""}`}
                onClick={() => {
                  setClickedNegative(true);
                  setTimeout(() => {
                    setClickedNegative(false);
                  }, 100);
                  setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
                }}
              >
                <p
                  className={`increment-p ${clickedNegative ? "clicked" : ""}`}
                >
                  -
                </p>
              </div>
              <p className="increment-p increment-num">{quantity}</p>
              <div
                className={`increment-div ${clickedPositive ? "clicked" : ""}`}
                onClick={() => {
                  setClickedPositive(true);
                  setTimeout(() => {
                    setClickedPositive(false);
                    setQuantity((prev) => prev + 1);
                  }, 100);
                }}
              >
                <p
                  className={`increment-p ${clickedPositive ? "clicked" : ""}`}
                >
                  +
                </p>
              </div>
            </div>
            <button
              className="btn red-btn product-detail-content-btn"
              onClick={() => {
                quantity && handleAddToCart(item);
                setQuantity(0);
              }}
              disabled={quantity === 0}
            >
              Buy Now
            </button>
            <div className="size">
              <div className="likeBox" onClick={handleLike}>
                <img
                  src={
                    isLiked
                      ? "/assets/images/icons/fullheart.svg"
                      : "/assets/images/icons/heart.svg"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-detail-content-services">
            <div className="product-detail-content-service delivery">
              <img src="/assets/images/icons/icon-delivery.svg" alt="" />
              <div className="product-detail-content-service-text">
                <h3>Free Delivery</h3>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="product-detail-content-service">
              <img src="/assets/images/icons/Icon-return.svg" alt="" />
              <div className="product-detail-content-service-text">
                <h3>Return Delivery</h3>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block-heading">
        <div className="block-block"></div>
        <h4>Related Item</h4>
      </div>
      <div className="block-title">
        {visibleItems.map((item) => (
          <div key={item.id} className=" product-detail-relatedItems">
            <div className="item-card">
              <div className="cover">
                <ItemLike item={item} />
                <Link to={`/products/${item.id}`}>
                  <div className="icon icon-whitebg cover-icon cover-icon-quick-view">
                    <img src="/assets/images/icons/Quick View.svg" alt="" />
                  </div>
                  <div className="cover-image">
                    <img src={item.image} alt="" />
                  </div>
                </Link>
              </div>
              <h2>{item.name}</h2>
              <div className="card-price">
                <p className="price">${item.price}</p>
                {item.originalPrice && (
                  <p className="prev-price">${item.originalPrice}</p>
                )}
              </div>
              <div className="rating">
                <StarRating rating={item.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
