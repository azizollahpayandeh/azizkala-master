import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 mt-[50px]">
        <div className="pic hidden lg:block">
          <Image
            src="/assets/Side Image.png"
            width={550}
            height={550}
            alt="Image"
            className="2xl:w-[650px] 2xl:h-[650px]"
          />
        </div>

        <div className="flex justify-center ">
          <div className="  flex flex-col justify-center w-auto  xl:w-[400px]  gap-[30px] 2xl:gap-[40px] ">
            <div>
              <h1 className="text-[34px] font-[500]">Sign up to Exclusive</h1>
              <span className="text-[17px] opacity-80 font-[400]">
                Enter your details below
              </span>
            </div>

            <input
              type="text"
              placeholder="Name"
              className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
            />
            <input
              type="password"
              placeholder="password"
              className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
            />
            <div className="flex justify-between items-center ">
              <Link href="#">
                <Button value="sign up" />
              </Link>
              <p className="">
                Already have account?{" "}
                <span className="text-red text-[17px] font-[500] pl-[2px] ">
                  <Link href="/auth/login">login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
