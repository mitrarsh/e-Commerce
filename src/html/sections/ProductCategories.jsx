import { useState } from "react";

const ProductCategories = () => {
  const categories = [
    {
      id: "phones",
      label: "Phones",
      icon: "src/assets/icons/Category-CellPhone.svg",
      iconHovered: "src/assets/icons/Category-CellPhonewhite.svg",
    },
    {
      id: "computers",
      label: "Computers",
      icon: "src/assets/icons/Category-Computer.svg",
      iconHovered: "src/assets/icons/Category-Computerwhite.svg",
    },
    {
      id: "smartwatch",
      label: "SmartWatch",
      icon: "src/assets/icons/Category-SmartWatch.svg",
      iconHovered: "src/assets/icons/Category-SmartWatchwhite.svg",
    },
    {
      id: "camera",
      label: "Camera",
      icon: "src/assets/icons/Category-Camera.svg",
      iconHovered: "src/assets/icons/Category-Camerawhite.svg",
    },
    {
      id: "headphones",
      label: "HeadPhones",
      icon: "src/assets/icons/Category-Headphone.svg",
      iconHovered: "src/assets/icons/Category-Headphonewhite.svg",
    },
    {
      id: "gaming",
      label: "Gaming",
      icon: "src/assets/icons/Category-Gamepad.svg",
      iconHovered: "src/assets/icons/Category-Gamepadwhite.svg",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className="block all-products-block">
      <div className="block-heading">
        <div className="block-block"></div>
        <h4>Categories</h4>
      </div>
      <div className="block-title">
        <h2>Browse By Category</h2>

      </div>

      <div className="product-categories-content">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="service-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={
                hoveredIndex === index ? category.iconHovered : category.icon
              }
              alt={category.label}
            />
            <p
              className={`service-card-p-${
                hoveredIndex === index ? "white" : "black"
              }`}
            >
              {category.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
