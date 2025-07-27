import { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../context/itemsContext";

const BoomboxBilboard = ({CountDown}) => {
  const { bilboardProducts } = useContext(ItemContext);
  const item = bilboardProducts[5];

  const now = new Date();
const targetDate = new Date(
  now.getTime() +
    5 * 24 * 60 * 60 * 1000 +     
    23 * 60 * 60 * 1000 +         
    59 * 60 * 1000 +             
    35 * 1000                     
);

  return (
    <div className="block noborder-block">
      <div className="bilboard boombox-bilboard">
        <div className="bilboard-content-container">
          <div className="boombox-bilboard-content">
            <h4>{item.category}</h4>
            <h1>{item.name}</h1>
            {CountDown}
            <Link to={`/bilboard-products/${item.id}`}>
              <button className="btn green-btn btn-small boombox-bilboard-btn">
                {item.linkText}
              </button>
            </Link>
          </div>
          <img
            src="src/assets/bilboards/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BoomboxBilboard;
