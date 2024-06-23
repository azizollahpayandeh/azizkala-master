"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Product from "@/Components/Modules/Product/product";
import ButtonWithoutBg from "@/Components/Modules/ButtonWithoutBg/ButtonWithoutBg";
import axios from "axios";
import { ProductType as ProductType } from "@/types";
import Link from "next/link";

export default function page() {
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  const [justForYouProducts, setJustForYouProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Fetch wishlist products
    axios.get("http://127.0.0.1:8000/api/wishlist/")
      .then(response => {
        setWishlistProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching wishlist products:", error);
      });

    // Fetch just for you products
    axios.get("http://127.0.0.1:8000/api/products/")
      .then(response => {
        setJustForYouProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching just for you products:", error);
      });
  }, []);

  return (
    <>
      <div className="pt-[100px]">
        <div className="title flex justify-between pt-[25px] items-center">
          <h1 className="md:text-[34px] text-[30px] font-[600] ">
            Wishlist (0)
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
            {wishlistProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Product
                  name={product.product_name}
                  price={product.price}
                  imageUrl={product.images[0]?.image}
                  productId={product.id}

                />
              </SwiperSlide>
            ))}
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
                  Just for You
                </h2>
              </div>
            </div>
            <Link href={'/'}>
              <ButtonWithoutBg value="See All" />
            </Link>
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
              {justForYouProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Product
                    name={product.product_name}
                    price={product.price}
                    imageUrl={product.images[0]?.image}
                    productId={product.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
