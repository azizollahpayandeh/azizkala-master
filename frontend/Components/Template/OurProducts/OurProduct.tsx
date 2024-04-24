"use client";
import React from "react";
import TitleTemplate from "@/Components/Modules/titleTemplate/titleTemplate";
import Button from "@/Components/Modules/Button/Button";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Product from "@/Components/Modules/Product/product";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function OurProduct() {
  return (
    <>
      <div className="pt-[100px]">
        <div className="TitleTemplate">
          <TitleTemplate title="Our Products" />
        </div>

        <div className="title flex justify-between pt-[25px] items-center">
          <h1 className="md:text-[36px] text-[30px] font-[600] ">
            Explore Our Products
          </h1>
          <div className="flex gap-2">
            <div className="w-[40px] prevElOur h-[40px]  md:w-[50px] md:h-[50px] rounded-full bg-[#F7F7FC] flex justify-center items-center">
              <FaArrowLeft className=" w-[18px] " />
            </div>
            <div className="w-[40px] nextElOur h-[40px]  md:w-[50px] md:h-[50px] rounded-full bg-[#F7F7FC] flex justify-center items-center">
              <FaArrowRight className=" w-[18px] " />
            </div>
          </div>
        </div>

        <div className="sliders mt-[50px] ">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className=""
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            navigation={{
              prevEl: ".prevElOur",
              nextEl: ".nextElOur",
            }}
            breakpoints={{
              1380: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 3,
              },
              660: {
                slidesPerView: 2,
              },
              425: {
                slidesPerView: 1,
              },
              250: {
                slidesPerView: 1,
              },
            }}
          >
            <SwiperSlide className="grid grid-rows-4 row-span-4 ">
              <div className="">
                <Product />
              </div>
              <div className="pt-[50px]">
                <Product />
              </div>
            </SwiperSlide>

            <SwiperSlide className="grid grid-rows-4 row-span-4 ">
              <div className="">
                <Product />
              </div>
              <div className="pt-[50px]">
                <Product />
              </div>
            </SwiperSlide>

            <SwiperSlide className="grid grid-rows-4 row-span-4 ">
              <div className="">
                <Product />
              </div>
              <div className="pt-[50px]">
                <Product />
              </div>
            </SwiperSlide>

            <SwiperSlide className="grid grid-rows-4 row-span-4 ">
              <div className="">
                <Product />
              </div>
              <div className="pt-[50px]">
                <Product />
              </div>
            </SwiperSlide>

            <SwiperSlide className="grid grid-rows-4 row-span-4 ">
              <div className="">
                <Product />
              </div>
              <div className="pt-[50px]">
                <Product />
              </div>
            </SwiperSlide>

          </Swiper>
        </div>

        <div className="flex justify-center items-center pt-[50px]">
          <Button value="View All Products" />
        </div>
      </div>
    </>
  );
}
