// Product.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import { ProductType } from "@/types";

interface ProductProps {
  name: string;
  price: number;
  imageUrl: string;
  productId: number;
}

export default function Product({ name, price, imageUrl, productId }: ProductProps) {
  return (
    <div className="flex justify-center">
      <div className="relative w-[270px] h-auto">
        <div className="icons absolute top-[10px] left-[230px] gap-1 flex flex-col">
          <div className="w-[35px] h-[35px] cursor-pointer bg-[#FFFFFF] rounded-full items-center justify-center flex">
            <CiHeart className="w-[25px] h-[20px]" />
          </div>
          <div className="w-[35px] h-[35px] cursor-pointer bg-[#FFFFFF] rounded-full items-center justify-center flex">
            <LuEye className="w-[25px] h-[20px]" />
          </div>
        </div>
        <div className="img bg-[#F7F7FC] w-[270px] h-[250px] flex justify-center items-center ">
          <div className="">
            <Image
              width={182}
              height={162}
              alt="Product Image"
              src={imageUrl}
              className=""
            />
          </div>
        </div>
        <div className="details flex flex-col gap-2 mt-[10px]">
          <Link href={`/product/${productId}`}>
            <h1 className="productName font-[500]">{name}</h1>
          </Link>
          <h4 className="price font-[500]">${price}</h4>
          <Image
            width={100}
            height={70}
            alt="stars"
            src="/assets/FiveStar.png"
          />
        </div>
      </div>
    </div>
  );
}
