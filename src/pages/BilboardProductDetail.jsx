import React, { useContext } from 'react'
import { ItemContext } from '../context/itemsContext'
import { useParams } from 'react-router-dom';

const BilboardProductDetail = () => {
    const {id}= useParams();
    const {bilboardProducts} = useContext(ItemContext);
    const item = bilboardProducts.find((i) => String(i.id) === id)
    if (!item) return <p>Product not found</p>;
  return (
    <div>{item.name}</div>
  )
}

export default BilboardProductDetail