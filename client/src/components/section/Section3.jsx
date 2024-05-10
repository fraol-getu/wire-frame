import React from "react";
import Text from "../text/Text";
import Image6 from "../../assets/image/img6.png";
import Image7 from "../../assets/image/img7.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section3 = ({data}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const postionProgress = useTransform(scrollYProgress, [-300, 0], [0.5, 1]);

  return (
    <motion.div className="relative min-h-[900px]">
      <motion.img
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          left: postionProgress,
        }}
        src={Image6}
        alt="img1"
        className="absolute left-[0] top-[0] "
      />
      <Text
        style={[
          {
            cl: "absolute left-[50%] top-[35%] z-[10] translate-x-[-50%]  translate-y-[-50%] w-[80%]",
          },
        ]}
        title={data[3]?.title}
        content={data[3]?.content}
      />
      <motion.img
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          right: postionProgress,
        }}
        src={Image7}
        alt="img1"
        className="absolute right-[0] top-[0] w-500 h-500 "
      />
    </motion.div>
  );
};

export default Section3;
