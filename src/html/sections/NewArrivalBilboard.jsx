import { Link } from "react-router-dom";
import { ItemContext } from "../../context/itemsContext";
import { useContext } from "react";

const NewArrivalBilboard = () => {
    const { bilboardProducts } = useContext(ItemContext);
    const playstation= bilboardProducts[0];
    const perfume= bilboardProducts[3];
    const womenCollection= bilboardProducts[1];
    const Speakers= bilboardProducts[2];


  return (
    
    <div className="block all-products-block">
      <div className="block-heading">
        <div className="block-block"></div>
        <h4>Featured</h4>
      </div>
      <div className="block-title">
        <h2>New Arrival</h2>
      </div>
      {/* content */}
      <div className="content">
        <div className="new-arrival-bilboard"> 
          <div className="playstation bilboard new-arrival-bilboards">
            <img
              src="src\assets\bilboards\ps5-slim-goedkope-playstation_large 1.svg"
              alt=""
            />
            <div className="new-arrival-bilboards-content">
              <h2>{playstation.name}</h2>
              <p>{playstation.description}</p>
              <Link to={`/bilboard-products/${playstation.id}`}>
                <div className="shop-link">
                  <div className="shop-link--link">{playstation.linkText}</div>
                  <img src="src\assets\icons\arrowwhite.svg" alt="" />
                </div>
              </Link>
            </div>
          </div>
          <div className="womencollection bilboard new-arrival-bilboards">
            <img
              src="src\assets\bilboards\455c8d6408463f7e8f57dd3048a2444dbfa0cb90.jpg"
              alt=""
            />
            <div className="new-arrival-bilboards-content">
              <h2>{womenCollection.name}</h2>
              <p>{womenCollection.description}</p>
              <Link to={`/bilboard-products/${womenCollection.id}`}>
                <div className="shop-link">
                  <div className="shop-link--link">{womenCollection.linkText}</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="speakers bilboard new-arrival-bilboards">
            <img
              src="src\assets\bilboards\69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.svg"
              alt=""
            />
            <div className="new-arrival-bilboards-content">
              <h2>{Speakers.name}</h2>
              <p>{Speakers.description}</p>
              <Link to={`/bilboard-products/${Speakers.id}`}>
                <div className="shop-link">
                  <div className="shop-link--link">{Speakers.linkText}</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="perfume bilboard new-arrival-bilboards">
            <img
              src="src\assets\bilboards\652e82cd70aa6522dd785109a455904c.svg"
              alt=""
            />
            <div className="new-arrival-bilboards-content">
              <h2>{perfume.name}</h2>
              <p>{perfume.description}</p>
              <Link to={`/bilboard-products/${perfume.id}`}>
                <div className="shop-link">
                  <div className="shop-link--link">{perfume.linkText}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalBilboard;
