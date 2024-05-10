import { useScroll, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Url } from "../../api/api";
import axios from "axios";

const Text = ({  style }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(Url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err, "error"));
    };

    fetchData();
  }, []);
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
      {data.map((content) => {
        return (
          <div>
            <h2>{content.title}</h2>
            <p>{content.content}</p>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Text;
