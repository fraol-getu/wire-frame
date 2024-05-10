import React from "react";
import Text from "../text/Text";
import Image1 from "../../assets/image/img1.png";
import Image2 from "../../assets/image/img2.png";
import Image3 from "../../assets/image/img3.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const Section1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const postionProgress = useTransform(scrollYProgress, [-400, 0], [0.5, 1]);

  return (
    <motion.div className="relative min-h-[1480px]">
      <motion.img
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          left: postionProgress,
        }}
        src={Image1}
        alt="img1"
        className="absolute left-[0] top-[0] "
      />
      <Text
        style={[
          {
            cl: "absolute left-[50%] top-[15%] z-[10] translate-x-[-50%]  translate-y-[-50%] w-[60%]",
          },
        ]}
      />
      <motion.img
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          right: postionProgress,
        }}
        src={Image2}
        alt="img2"
        className="absolute top-[0] right-0"
      />
      <Text
        style={[
          {
            cl: "absolute left-[65%] bottom-[8%] z-[10] translate-x-[-50%]  translate-y-[-50%]",
          },
        ]}
      />
      <img
        ref={ref}
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          right: postionProgress,
        }}
        src={Image3}
        alt="img3"
        className="absolute bottom-[0] right-0 z-[11]"
      />
    </motion.div>
  );
};

export default Section1;
