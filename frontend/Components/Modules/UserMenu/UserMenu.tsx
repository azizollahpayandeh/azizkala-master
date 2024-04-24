import Link from "next/link";
import React from "react";

export default function UserMenu() {
  return (
    <>
      <div className="z-50">
        <div className="w-[150px] h-auto bg-gradient-to-r blur-[0.2px] rounded-md bg-opacity-20 from-[#71717c]  to-[#4c3483]  absolute ">
          <ul className="flex flex-col gap-3 m-3">
            <Link href="/account">
              <li className="hover:text-[18px] text-[17px] transition-all duration-200 cursor-pointer">
                Account
              </li>
            </Link>
            <Link href="/account/address">
              <li className="hover:text-[18px] text-[17px] transition-all duration-200 cursor-pointer">
                Address Book
              </li>
            </Link>
            <Link href="/account/myCancellations">
            <li className="hover:text-[18px] text-[17px] transition-all duration-200 cursor-pointer">
              My Cancelation
            </li>
            </Link>
            <Link href="myReturns">
            <li className="hover:text-[18px] text-[17px] transition-all duration-200 cursor-pointer">
              My Revers
            </li>
            </Link>
            <Link href="paymentOptions">
            <li className="hover:text-[18px] text-[17px] transition-all duration-200 cursor-pointer">
            My Payment Options
            </li>
            </Link>
            <li className="hover:text-[18px] text-[17px] transition-all duration-200 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
