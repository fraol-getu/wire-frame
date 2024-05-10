import React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Image8 from "../../assets/image/img8.png";
import Image9 from "../../assets/image/img9.png";
const Section4 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const postionProgress = useTransform(scrollYProgress,[-400, 0],[0.5, 1] )

  return (
    <motion.div
    className="relative min-h-[578px] my-[10%] flex  justify-between"
    >
      <motion.img 
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          left: postionProgress,
        }}
      
      src={Image8} alt="img1" className="absolute bottom-0" />
      <motion.img 
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          right: postionProgress,
        }}
      src={Image9} alt="img3" className="absolute right-[0] bottom-0 " />
    </motion.div>
  );
};

export default Section4;
