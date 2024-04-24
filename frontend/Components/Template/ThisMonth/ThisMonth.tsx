"use client"
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

export default function ThisMonth() {
  return (
    <>
      <div className="pt-[100px]">
        <div className="TitleTemplate">
          <TitleTemplate title="This Month" />
        </div>

        <div className="title flex justify-between pt-[25px] items-center">
          <h1 className="md:text-[36px] text-[30px] font-[600] ">
            Best Selling Products
          </h1>

          <div className="pt-[50px]">
            <Button value="View All" />
          </div>
        </div>

        <div className="sliders mt-[50px]">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className=""
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            navigation={{
              prevEl: ".prevEl",
              nextEl: ".nextEl",
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
            <SwiperSlide className="">
              <Product />
            </SwiperSlide>
            <SwiperSlide className="">
              <Product />
            </SwiperSlide>
            <SwiperSlide className="">
              <Product />
            </SwiperSlide>
            <SwiperSlide className="">
              <Product />
            </SwiperSlide>
            <SwiperSlide className="">
              <Product />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
