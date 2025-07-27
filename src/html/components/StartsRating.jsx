import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <img key={i} src="/assets/images/icons/fullstar.svg" alt="full star" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <img key={i} src="/assets/images/icons/star-half-filled.svg" alt="half star" />
      );
    } else {
      stars.push(
        <img key={i} src="/assets/images/icons/emptystar.svg" alt="empty star" />
      );
    }
  }
  return <>{stars}</>;
};

export default StarRating;