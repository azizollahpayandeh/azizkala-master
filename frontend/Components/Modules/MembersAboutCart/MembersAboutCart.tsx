import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { TiSocialLinkedin } from "react-icons/ti";

interface UserProp {
  ImageSrc: string,
  Name: string,
  Role: string
}

export default function MembersAboutCart({ ImageSrc, Name, Role }: UserProp) {
  return (
    <>
      <div className="">
        <Image
        className="h-[400px]"
          src={ImageSrc}
          alt="Farme"
          width={370}
          height={200}
        />
        <h1 className="text-[32px] font-[400] pt-[5px]">{Name}</h1>
        <p className="pt-[3px]">{Role}</p>
        <div className="social flex gap-4 pt-[6px]">
          <FaInstagram fontSize={20} className=" cursor-pointer" />
          <FiTwitter fontSize={20} className=" cursor-pointer" />
          <TiSocialLinkedin fontSize={25} className=" cursor-pointer" />
        </div>
      </div>
    </>
  );
}
