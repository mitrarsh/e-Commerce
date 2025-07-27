import { useContext, useEffect } from "react";
import { ItemContext } from "../../context/itemsContext";

const ItemLike = ({ item }) => {
  const { setLikedItems, likedItems } = useContext(ItemContext);
  const isLiked = likedItems.some((i) => i.id === item.id);


  const handleLike = () => {
    !isLiked
      ? setLikedItems([...likedItems, item])
      : setLikedItems(likedItems.filter((i) => i.id !== item.id));
      };

  return (
    <div
      className="icon icon-whitebg cover-icon cover-icon-heart"
      onClick={handleLike}
    >
      <img
        src={
          isLiked ? "/assets/images/icons/fullheart.svg" : "/assets/images/icons/heart.svg"
        }
        alt=""
      />
    </div>
  );
};

export default ItemLike;
