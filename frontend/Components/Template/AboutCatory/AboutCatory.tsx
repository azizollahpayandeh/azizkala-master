"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AboutCategorySlide from "@/Components/Modules/AboutCategorySlide/AboutCategorySlide";

export default function AboutCategory() {
  return (
    <>
      <div className="mt-[100px]">

        <div className="sliders mt-[50px] flex justify-between items-center ">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className=""
            
            // spaceBetween={70}
            slidesPerView={6}
            loop={true}
            navigation={{
              prevEl: ".prevElcat",
              nextEl: ".nextElcat",
            }}
            breakpoints={{
              1500: {
                slidesPerView: 5,
                spaceBetween: 70
              },
              1350: {
                slidesPerView: 4,
                spaceBetween: 60
              },
              1020: {
                slidesPerView: 4,
                spaceBetween: 50
              },
              650: {
                slidesPerView: 3,
                spaceBetween:20
              },
              488: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              250: {
                slidesPerView: 1,
                spaceBetween: 0
              },
            }}
          >
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
            <SwiperSlide className="">
              <AboutCategorySlide />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
