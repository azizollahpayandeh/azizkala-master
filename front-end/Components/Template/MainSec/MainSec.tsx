"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowForwardIos } from "react-icons/md";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

export default function MainSec() {
  return (
    <>
      <div className="flex relative " id="MainSec">
        <div className=" slider hidden border-r-2 pt-[30px]  lg:flex justify-between lg:flex-col lg:w-[25%]">
          <div className="cursor-pointer  hover:text-gray-500 flex 2xl:gap-36 xl:gap-[100px] lg:gap-[50px]  font-[500]">
            <a className=" text-[18px] ">
              Woman’s Fashion
            </a>
            <MdArrowForwardIos className="w-[13px]" />
          </div>
          <div className="cursor-pointer  hover:text-gray-500 flex 2xl:gap-[169px] xl:gap-[125px] lg:gap-[75px] font-[500]">
            <a className=" text-[18px] ">
              Men’s Fashion
            </a>
            <MdArrowForwardIos className="w-[13px]" />
          </div>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Electronics
          </a>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Home & afestyle
          </a>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Medicine
          </a>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Sports & Outdoor
          </a>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Baby’s & Toys
          </a>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Groceries & Pets
          </a>
          <a className="cursor-pointer  hover:text-gray-500 text-[18px] font-[500]">
            Health & Beauty
          </a>
        </div>
        <div className=" lleftbar lg:w-[75%] w-[100%] z-0 ">
          <div className=" lg:pt-[40px] lg:pl-[45px]   ">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
                
             }}
            >
              <SwiperSlide className="">
                <Image
                width={1000}
                height={1000}
                  alt="frame"
                  src="/assets/Frame500.png"
                  className=" lg:w-[892px] 2xl:w-[1000px] h-auto md:h-auto"
                />
              </SwiperSlide>
              <SwiperSlide className="">
                <Image
                width={1000}
                height={1000}
                  alt="frame"
                  src="/assets/Frame500.png"
                  className=" lg:w-[892px] 2xl:w-[1000px] h-auto md:h-auto"
                />
              </SwiperSlide>
              <SwiperSlide className="">
                <Image
                width={1000}
                height={1000}
                  alt="frame"
                  src="/assets/Frame500.png"
                  className=" lg:w-[892px] 2xl:w-[1000px] h-auto md:h-auto"
                />
              </SwiperSlide>
              <SwiperSlide className="">
                <Image
                width={1000}
                height={1000}
                  alt="frame"
                  src="/assets/Frame500.png"
                  className=" lg:w-[892px] 2xl:w-[1000px] h-auto md:h-auto"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
