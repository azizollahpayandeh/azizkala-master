"use client";
import TitleTemplate from "@/Components/Modules/titleTemplate/titleTemplate";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "@/Components/Modules/ProductCard/ProductCard";

export default function Categories() {
  return (
    <>
      <div className="pt-[60px]">
        <div className="TitleTemplate">
          <TitleTemplate title="Categories" />
        </div>

        <div className="title flex justify-between pt-[25px] items-center">
          <h1 className="md:text-[36px] text-[30px] font-[600] ">
            Flash Sales
          </h1>
          <div className="flex gap-2">
            <div className="w-[40px] prevElcat h-[40px]  md:w-[50px] md:h-[50px] rounded-full bg-[#F7F7FC] flex justify-center items-center">
              <FaArrowLeft className=" w-[18px] " />
            </div>
            <div className="w-[40px] nextElcat h-[40px]  md:w-[50px] md:h-[50px] rounded-full bg-[#F7F7FC] flex justify-center items-center">
              <FaArrowRight className=" w-[18px] " />
            </div>
          </div>
        </div>

        <div className="sliders mt-[50px] flex justify-center items-center ">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className=""
            spaceBetween={30}
            slidesPerView={6}
            loop={true}
            navigation={{
              prevEl: ".prevElcat",
              nextEl: ".nextElcat",
            }}
            breakpoints={{
              1500: {
                slidesPerView: 6,
              },
              1350: {
                slidesPerView: 5,
              },
              1020: {
                slidesPerView: 4,
              },
              650: {
                slidesPerView: 3,
              },
              488: {
                slidesPerView: 2,
              },
              250: {
                slidesPerView: 1,
              },
            }}
          >
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="">
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="mt-[60px]">
          <hr className="h-[3px] opacity-80 w-[100%]"></hr>
        </div>
      </div>
    </>
  );
}
