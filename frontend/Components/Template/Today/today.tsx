"use client"
import React from "react";
import TitleTemplate from "@/Components/Modules/titleTemplate/titleTemplate";
import Button from "@/Components/Modules/Button/Button"

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Product from "@/Components/Modules/Product/product";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


export default function Today() {
  return (
    <>
      <div className="pt-[100px]">
        <div className="TitleTemplate">
        <TitleTemplate title="Today’s" />
        </div>

        <div className="title flex justify-between pt-[25px] items-center">
            <h1 className="md:text-[36px] text-[30px] font-[600] ">Flash Sales</h1>
            <div className="flex gap-2">
            <div className="w-[40px] prevEl1 h-[40px]  md:w-[50px] md:h-[50px] rounded-full bg-[#F7F7FC] flex justify-center items-center">
              <FaArrowLeft className=" w-[18px] " />
            </div>
            <div className="w-[40px] nextEl2 h-[40px]  md:w-[50px] md:h-[50px] rounded-full bg-[#F7F7FC] flex justify-center items-center">
              <FaArrowRight className=" w-[18px] " />
            </div>
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
                prevEl: ".prevEl1",
                nextEl: ".nextEl2",
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

        <div className="flex justify-center items-center pt-[50px]">
          <Button value="View All Products"/>
        </div>

        <div className="mt-[60px]">
          <hr className="h-[3px] opacity-80 w-[100%]"></hr>
        </div>

      </div>
    </>
  );
}
