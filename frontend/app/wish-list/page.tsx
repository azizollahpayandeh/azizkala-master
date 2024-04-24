"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Product from "@/Components/Modules/Product/product";
import ButtonWithoutBg from "@/Components/Modules/ButtonWithoutBg/ButtonWithoutBg";
import Image from "next/image";

export default function page() {
  return (
    <>
      <div className="pt-[100px]">
        <div className="title flex justify-between pt-[25px] items-center">
          <h1 className="md:text-[34px] text-[30px] font-[600] ">
            Wishlist (4)
          </h1>

          <div className="">
            <ButtonWithoutBg value="Move All To Bag" />
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

        <div className="pt-[100px]">
          <div className="title flex justify-between pt-[25px] items-center">
            <div className="TitleTemplate">
              <div className="flex gap-3 items-center">
                <Image
                  width={15}
                  height={15}
                  alt=""
                  src="/assets/Rectangle 18.png"
                />
                <h2 className=" text-[25px] font-[600] leading-[20px]">
                  just for you
                </h2>
              </div>
            </div>
            <div className="">
              <ButtonWithoutBg value="See All" />
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
      </div>
    </>
  );
}
