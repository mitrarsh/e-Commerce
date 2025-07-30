import React, { useState } from 'react'
import {motion} from 'framer-motion';

const Dummy = () => { 
    // const [x, setX]= useState(0)
  return (
<>
    <motion.div initial={{x:50}} animate={{x:100}} transition={{duration:0.3, type:"spring"}} style={{width: "10rem", height: "10rem", backgroundColor: "red" }}>
    </motion.div>
    <button
    onClick={(e)=>setX(100)}
    >X</button></>
  )
}

export default Dummy