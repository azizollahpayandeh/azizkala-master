import Image from "next/image";
import React from "react";
import { MdOutlineSend } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { TiSocialLinkedin } from "react-icons/ti";
import { RiFacebookLine } from "react-icons/ri";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="mt-[100px] w-full h-auto  bg-[#000000] text-[#ffffff]">
        <div className="lg:pt-[80px] xl:pt-[100px] lg:pr-[80px] xl:pl-[100px] lg:pl-[80px] xl:pr-[100px] lg:pb-[50px] xl:pb-[70px]  flex flex-col justify-center items-center lg:items-start gap-10 lg:justify-between lg:flex-row">
          <div className="exclausiv flex mt-[80px] lg:mt-[0px]  items-center lg:items-start  flex-col">
            <Image
              alt="logo"
              width={140}
              height={50}
              src="/assets/azizkala-logo-white.png"
            />
            <p className="font-[500] text-[20px] pt-[15px]">subscribe</p>
            <span className="pt-[15px] text-[16px] font-[400] text-gray-300 cursor-pointer">
              Get 10% off your first order
            </span>
            <div className=" flex items-center lg:items-center bg-black border w-[200px] h-[30px] mt-[13px]">
              <input
                className="bg-black outline-none pl-[7px] placeholder-gray-400 text-sm"
                placeholder="Enter your email"
                type="text"
              />
              <MdOutlineSend className="text-white w-[18px] cursor-pointer" />
            </div>
          </div>

          <div className="support lg:w-[180px] flex items-center lg:items-start flex-col gap-3">
            <h1 className="text-[20px] font-[500]">Support</h1>
            <p className="text-[16px] font-[400] text-gray-200  cursor-pointer">
              111 Bijoy sarani Dhaka DH 1515 Bangladesh
            </p>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              AzizKala@gmail.com
            </p>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              +88015-88888-9999
            </p>
          </div>

          <div className="account  flex flex-col items-center lg:items-start gap-3">
            <h1 className="text-[20px] font-[500]">Account</h1>
            <Link href="/account">
              <p className="text-[16px] font-[400] text-gray-200 cursor-pointer ">
                My Account
              </p>
            </Link>
            <Link href="/auth/signup">
              <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
                Login / Register
              </p>
            </Link>
            <Link href="/cart">
              <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
                Cart
              </p>
            </Link>
          <Link href="/wish-list">
          <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              Wishlist
            </p>
          </Link>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              Shop
            </p>
          </div>

          <div className="quickLink  flex flex-col items-center lg:items-start gap-3">
            <h1 className="text-[20px] font-[500]">Quick Link</h1>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer ">
              Privacy Policy
            </p>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              Terms Of Use
            </p>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              FAQ
            </p>
            <p className="text-[16px] font-[400] text-gray-200 cursor-pointer">
              Contact
            </p>
          </div>

          <div className="downloadApp">
            <div className="items-center lg:items-start gap-3 flex flex-col">
              <h1 className="text-[20px] font-[500]">Download App</h1>
              <p className="text-[12px] font-[500] text-gray-300 cursor-pointer ">
                Save $3 with App New User Only
              </p>
              <Image
                alt="logo"
                width={183}
                height={1000}
                src="/assets/Frame 719.png"
                className="cursor-pointer"
              />
            </div>
            <div className="social pt-[15px]  pb-[20px] flex justify-between">
              <FaInstagram fontSize={20} className=" cursor-pointer" />
              <FiTwitter fontSize={20} className=" cursor-pointer" />
              <TiSocialLinkedin fontSize={25} className=" cursor-pointer" />
              <RiFacebookLine fontSize={24} className=" cursor-pointer" />
            </div>
          </div>
        </div>
        <hr className="h-[2px]" />
        <div className="flex justify-center items-center">
          <h1 className="text-[16px] font-[400] text-gray-400 pt-[10px] pb-[10px] ">
            created by <a href="Azizollah.ir">azizollah</a>
          </h1>
        </div>
      </div>
    </>
  );
}
