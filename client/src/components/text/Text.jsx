import { motion, useScroll } from "framer-motion";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";

const Text = ({ title,content, style }) => {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  console.log("first");

  return (
    <motion.div
      ref={ref}
      style={{ opacity: scrollYProgress }}
      className={twMerge(
        `  bg-[var(--brown)] w-[50%] px-12 py-16 gap-16  text-center text-[var(--primary)]`,
        style[0].cl
      )}
    >
          <div>
            <h2 className="text-4xl font-bold mt-12 mb-8">{title}</h2>
            <p className="text-1xl ">{content}</p>
          </div>
 
    </motion.div>
  );
};

export default Text;
