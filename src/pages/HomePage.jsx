import { useContext } from "react";
import { ItemContext } from "../context/itemsContext";
import AllProducts from "../html/sections/AllProducts";
import Bestseller from "../html/sections/bestseller";
import BoomboxBilboard from "../html/sections/BoomboxBilboard";
import CategoriesSection from "../html/sections/categories-section";
import Footer from "../html/sections/Footer";
import NavContainer from "../html/sections/nav-container";
import NewArrivalBilboard from "../html/sections/NewArrivalBilboard";
import OnsaleSection from "../html/sections/onsales-section";
import OurServices from "../html/sections/OurServices";
import ProductCategories from "../html/sections/ProductCategories";
import TopHeader from "../html/sections/top-header";
import CountDownTimer from "./../html/components/timer";

const HomePage = () => {
  const { items, cartItems, setCartItems } = useContext(ItemContext);

  const handleAddToCart = (item) => {
    setCartItems([
      ...cartItems,
      { id: item.id, name: item.name, price: item.price, quantity: 1, color: item.colours[0], size: item.sizes[0]},
    ]);
  };


  const now = new Date();
  const salesTargetTime = new Date(
    now.getTime() +
      3 * 24 * 60 * 60 * 1000 +
      23 * 60 * 60 * 1000 +
      19 * 60 * 1000 +
      53 * 1000
  );
  const boomboxTargetTime = new Date(
    now.getTime() +
      5 * 24 * 60 * 60 * 1000 +
      23 * 60 * 60 * 1000 +
      59 * 60 * 1000 +
      35 * 1000
  );

  return (
    <div>

      <main className="main-content">
        <CategoriesSection />
        <OnsaleSection
          onAddToCart={handleAddToCart}
          CountDown={
            <CountDownTimer
              targetTime={salesTargetTime}
              render={(timeLeft) =>
                timeLeft ? (
                  <div className="timer-number">
                    <h2>{timeLeft.days}</h2>
                    <h2 className="timer-colon">:</h2>
                    <h2>{timeLeft.hours}</h2>
                    <h2 className="timer-colon">:</h2>
                    <h2>{timeLeft.minutes}</h2>
                    <h2 className="timer-colon">:</h2>
                    <h2>{timeLeft.seconds}</h2>
                  </div>
                ) : (
                  <p>Sale ended</p>
                )
              }
            />
          }
        />
        <ProductCategories />
        <Bestseller />
        <BoomboxBilboard
          CountDown={
            <CountDownTimer
              targetTime={boomboxTargetTime}
              render={(timeLeft) =>
                timeLeft ? (
                  <div className="boombox-bilboard-timer">
                    <div className="boombox-bilboard-timer-circle">
                      <h3>{timeLeft.hours}</h3>
                      <p>Hours</p>
                    </div>
                    <div className="boombox-bilboard-timer-circle">
                      <h3>{timeLeft.days}</h3>
                      <p>Days</p>
                    </div>
                    <div className="boombox-bilboard-timer-circle">
                      <h3>{timeLeft.minutes}</h3>
                      <p>Mnutes</p>
                    </div>
                    <div className="boombox-bilboard-timer-circle">
                      <h3>{timeLeft.seconds}</h3>
                      <p>Seconds</p>
                    </div>
                  </div>
                ) : (
                  <p>Sale ended</p>
                )
              }
            />
          }
        />
        <AllProducts onAddToCart={handleAddToCart} />
        <NewArrivalBilboard />
        <OurServices />
      </main>

    </div>
  );
};

export default HomePage;
