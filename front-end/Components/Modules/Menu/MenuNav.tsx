import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <>
      <div className="z-50">
        <div className="w-[150px] h-auto bg-gradient-to-r blur-[0.2px] rounded-md bg-opacity-20 from-[#71717c]  to-[#4c3483]  absolute ">
          <ul className="flex flex-col gap-3 m-3">
            <Link href={"/"}>
              <li className="hover:text-[19px] text-[18px] transition-all duration-200 cursor-pointer">
                Home
              </li>
            </Link>
            <Link href={"/concat"}>
              <li className="hover:text-[19px] text-[18px] transition-all duration-200 cursor-pointer">
                Contact
              </li>
            </Link>
            <Link href={"/about"}>
              <li className="hover:text-[19px] text-[18px] transition-all duration-200 cursor-pointer">
                About
              </li>
            </Link>
            <Link href={"/auth/signup"}>
              <li className="hover:text-[19px] text-[18px] transition-all duration-200 cursor-pointer">
                Sign Up
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
