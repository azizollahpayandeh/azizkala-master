"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideBar() {
  const path = usePathname();

  return (
    <div className="lg:flex flex-col hidden ">
      <h1 className="font-[500] 2xl:text-[18px]">Manage My Account</h1>
      <div className="pt-[15px] 2xl:w-[50%] xl:w-[70%] pb-[15px] flex flex-col gap-3">
        <Link href={"/account"}>
          <p
            className={`text-[15px]  opacity-60 pl-[20px] font-[500] cursor-pointer hover:text-hoverbtn ${
              path == "/account" ? "text-red" : ""
            }`}
          >
            My Profile
          </p>
        </Link>
        <Link href="/account/address">
          <p
            className={`text-[15px]  opacity-60 pl-[20px] font-[500] cursor-pointer hover:text-hoverbtn  ${
              path == "/account/address" ? "text-red" : ""
            }`}
          >
            Address Book
          </p>
        </Link>
        <Link href="paymentOptions">
          <p
            className={`text-[15px]  opacity-60 pl-[20px] font-[500] cursor-pointer hover:text-hoverbtn  ${
              path == "/account/paymentOptions" ? "text-red" : ""
            }`}
          >
            My Payment Options
          </p>
        </Link>
      </div>
      <h1 className="font-[500] 2xl:text-[18px]">My Orders</h1>
      <div className="pt-[15px] 2xl:w-[50%] xl:w-[70%] pb-[15px] flex flex-col gap-3">
        <Link href="/account/myReturns">
          <p
            className={`text-[15px]  opacity-60 pl-[20px] font-[500] cursor-pointer hover:text-hoverbtn  ${
              path == "/account/myReturns" ? "text-red" : ""
            }`}
          >
            My Returns
          </p>
        </Link>
        <Link href="/account/myCancellations">
          <p
            className={`text-[15px]  opacity-60 pl-[20px] font-[500] cursor-pointer hover:text-hoverbtn  ${
              path == "/account/myCancellations" ? "text-red" : ""
            }`}
          >
            My Cancellations
          </p>
        </Link>
      </div>
      <h1 className="font-[500] 2xl:text-[18px]">My Washlist</h1>
      <Link href="/wish-list">
        <p className="text-[15px] 2xl:w-[40%] xl:w-[40%]  opacity-60 pl-[20px] pt-[5px] font-[500] cursor-pointer hover:text-hoverbtn">
          Lets See
        </p>
      </Link>
    </div>
  );
}
