import { createContext, useEffect, useState } from "react";

export const ItemContext = createContext({ items: [] });
export default function ItemContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
   const addToUserCart = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (!currentUser) {
        return;
      }
      const index = users.findIndex((user) => user.id === currentUser.id);
      if (index !== -1) {
        const updatedUser = { ...users[index], cart: cartItems };
        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    };
    addToUserCart();
  }, [cartItems]);

  const itemCategories = [
    { name: "Woman's Fashion" },
    { name: "Men's Fashion" },
    {
      name: "Electronics",
      subcategories: [
        "Phones",
        "Computers",
        "SmartWatch",
        "Camera",
        "HeadPhones",
        "Gaming",
      ],
    },
    { name: "Home & Lifestyle" },
    { name: "Medicine" },
    { name: "Sports & Outdoor" },
    { name: "Baby's & Toys" },
    { name: "Groceries & Pets" },
    { name: "Health & Beauty" },
  ];

  const bilboardProducts = [
    {
      id: "ps5-black-white",
      name: "PlayStation 5",
      description: "Black and White version of the PS5 coming out on sale.",
      category: "Gaming",
      image: "src/assets/images/ps5.png",
      linkText: "Shop Now",
      link: "/bilboard-products/ps5-black-white",
    },
    {
      id: "womens-collection",
      name: "Women's Collection",
      description: "Featured woman collections that give you another vibe.",
      category: "Fashion",
      image: "src/assets/images/women-collection.png",
      linkText: "Shop Now",
      link: "/bilboard-products/womens-collection",
    },
    {
      id: "amazon-speakers",
      name: "Speakers",
      description: "Amazon wireless speakers",
      category: "Electronics",
      image: "src/assets/images/speakers.png",
      linkText: "Shop Now",
      link: "/bilboard-products/amazon-speakers",
    },
    {
      id: "gucci-perfume",
      name: "Perfume",
      description: "GUCCI INTENSE OUD EDP",
      category: "Fragrance",
      image: "src/assets/images/perfume.png",
      linkText: "Shop Now",
      link: "/bilboard-products/gucci-perfume",
    },
    {
      id: "jbl-boombox",
      name: "Enhance Your Music Experience",
      description:
        "Limited time offer on JBL wireless speakers. Don’t miss out!",
      category: "Categories",
      countdown: {
        hours: 23,
        days: 0,
        minutes: 0,
        seconds: 0,
      },
      image: "src/assets/images/jbl-boombox.png",
      linkText: "Buy Now!",
      link: "/bilboard-products/jbl-boombox",
    },
    {
      id: "iphone14-voucher",
      name: "iPhone 14 Series",
      description: "Up to 10% off Voucher",
      category: "Smartphones",
      image: "src/assets/images/iphone14.png",
      linkText: "Shop Now",
      link: "/bilboard-products/iphone14-voucher",
    },
  ];

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("http://localhost:3000/items");
        const resData = await res.json();
        if (!res.ok) {
          throw new Error("Error fetching");
        }
        setItems(resData);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    fetchItems();
  }, []);

  async function sendInfo(info) {
    try {
      const response = await fetch("http://localhost:3000/info", {
        method: "POST",
        body: JSON.stringify({ info }),
        headers: { "content-type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Error sending");
      }
      setInfo(resData);
    } catch (error) {
      console.log("Error sending data", error);
    }
  }

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        likedItems,
        setLikedItems,
        cartItems,
        setCartItems,
        bilboardProducts,
        itemCategories,
        info,
        setInfo,
        sendInfo,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
