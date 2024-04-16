import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { TiSocialLinkedin } from "react-icons/ti";

export default function MembersAboutCart() {
  return (
    <>
      <div className="">
        <Image
          src="/assets/Frame 874.png"
          alt="Farme"
          width={370}
          height={430}
        />
        <h1 className="text-[32px] font-[400] pt-[5px]">Tom Cruise</h1>
        <p className="pt-[3px]">Founder & Chairman</p>
        <div className="social flex gap-4 pt-[6px]">
          <FaInstagram fontSize={20} className=" cursor-pointer" />
          <FiTwitter fontSize={20} className=" cursor-pointer" />
          <TiSocialLinkedin fontSize={25} className=" cursor-pointer" />
        </div>
      </div>
    </>
  );
}
