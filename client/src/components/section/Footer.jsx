import React from "react";
import Image10 from "../../assets/image/img10.png";
import Image11 from "../../assets/image/img11.png";
import Image12 from "../../assets/image/img12.png";
import Image13 from "../../assets/image/img13.png";
import Image14 from "../../assets/image/img14.png";

const Footer = () => {
  return (
    <section className="bg-white height-[300px] align-middle flex justify-between p-8 ">
      <img src={Image10} alt="img10 " className="" />
      <div className="flex-col">
        <h2 className="">Links</h2>
        <h5>one</h5>
        <h5>one</h5>
        <h5>one</h5>
      </div>
      <div className="flex-col">
        <h3>Links</h3>
        <h6>one</h6>
        <h6>one</h6>
        <h6>one</h6>
      </div>
      <div className="flex-col">
        <h2 className=" text-center w-[100%] font-bold size-16">
          Payment Methods
        </h2>
        <div className="flex gap-4 relative">
          <img src={Image11} alt="img10 w-[10px] absolute" />
          <img src={Image12} alt="img11  w-[10px] absolute" />
          <img src={Image13} alt="img12  w-[10px] absolute" />
        </div>
      </div>
      <img src={Image14} alt="img14" className="" />
    </section>
  );
};

export default Footer;
