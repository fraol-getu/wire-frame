import React from "react";
import Image5 from "../../assets/image/img5.png";
import Text from "../text/Text";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="relative min-h-[900px]  my-24"
    >
      <img src={Image5} alt="img1" className="absolute left-[0] top-[0] " />
      <Text
        style={[
          {
            cl: "absolute left-[50%] top-[40%] bg-[var(--brown1)] z-[10] translate-x-[-50%]  translate-y-[-50%] w-[90%] h-[60%] ",
          },
        ]}
      />
    </motion.div>
  );
};

export default Section2;
