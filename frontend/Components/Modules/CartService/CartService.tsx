import Image from "next/image";
import React from "react";

interface CartServiceProps {
  title: string;
  desc: string;
  ImageAddress: string;
}

export default function CartService({ title, desc, ImageAddress }:CartServiceProps) {
  return (
    <>
      <div className="flex mt-[130px] flex-col justify-center items-center gap-5">
        <Image
          width={80}
          height={80}
          alt="Frame685"
          src={`${ImageAddress}`}
        />
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[20px] font-[600]">{title}</h1>
          <p className="text-[14px] font-[400]">{desc}</p>
        </div>
      </div>
    </>
  );
}
