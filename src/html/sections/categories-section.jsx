import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../context/itemsContext";

const CategoriesSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  const { bilboardProducts } = useContext(ItemContext);
  const item = bilboardProducts[5];
  const[fade, setFade] = useState(false);
  const handleDotClick = (idx) =>{
    if(activeDot ===idx) return;
    else{
      setFade(true);
      setTimeout(() => {
        setActiveDot(idx);
        setFade(false);
        // fade refers to the bilboard slide currently displayed based on active dot
      }, 500);
    }
  }



  return (
    <div className="categories-section">
      <div className="categories">
        <ul>
          <li>
            <a href="">
              <span className="category-link-content">
                Woman's Fashion
                <img
                  src="src/assets/icons/dropdownblack.svg"
                  alt=""
                  className="dropdown-icon"
                />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <span className="category-link-content">
                Men's Fashion
                <img
                  src="src/assets/icons/dropdownblack.svg"
                  alt=""
                  className="dropdown-icon"
                />
              </span>
            </a>
          </li>
          <li>
            <a href="">Electronics</a>
          </li>
          <li>
            <a href="">Home & Lifestyle</a>
          </li>
          <li>
            <a href="">Medicine</a>
          </li>
          <li>
            <a href="">Sports & Outdoor</a>
          </li>
          <li>
            <a href="">Baby's & Toys</a>
          </li>
          <li>
            <a href="">Groceries & Pets</a>
          </li>
          <li>
            <a href="">Health & Beauty</a>
          </li>
        </ul>
      </div>

      <div className="bilboard categories-section-bilboard">
        {(activeDot===0)?(<div className={`bilboard-content-container fade-bilboard${fade? " fade-exit" : ""}`}>
          <div className="bilboard-content categores-section-bilboard-content">
            <div className="bilboard-logo">
              <img src="src\assets\icons\1200px-Apple_gray_logo 1.svg" alt="" />
              <p>{item.name}</p>
            </div>
            <h1>{item.description}</h1>
            <Link
              to={`/bilboard-products/${item.id}`}
              onClick={() => {
                console.log("clg");
              }}
            >
              <div className="shop-link">
                <div className="shop-link--link">{item.linkText}</div>
                <img src="src\assets\icons\arrowwhite.svg" alt="" />
              </div>
            </Link>
          </div>
          <img
            src="src\assets\bilboards\hero_endframe__cvklg0xk3w6e_large 2.svg"
            alt=""
          />
        </div>):
        (activeDot===1)?(<div className={`bilboard-content-container fade-bilboard${fade? " fade-exit" : ""}`}>
          <div className="bilboard-content categores-section-bilboard-content">
            <h1>testing bilboard pagination page 2</h1>
          </div>
        </div>):(<div className={`bilboard-content-container fade-bilboard${fade? " fade-exit" : ""}`}>
          <div className="bilboard-content categores-section-bilboard-content">
            <h1>testing bilboard pagination page 3</h1>
          </div>
        </div>)}

        <div className="bilboard-pages">
          {[0, 1, 2].map((idx) => (
            <img
              key={idx}
              className="page-dot"
              src={
                activeDot === idx
                  ? "src/assets/icons/pagechosen.svg"
                  : "src/assets/icons/Ellipse 9.svg"
              }
              alt=""
              onClick={() => {
                handleDotClick(idx);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
