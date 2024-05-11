"use client"
import Link from "next/link"


import { IoSearch } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Menu from "../../Modules/Menu/MenuNav";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import UserMenu from "../UserMenu/UserMenu";
import { isLogging } from "@/utils/isLoggesIn/isLoggesIn";





export default function Navbar() {
  const path = usePathname()

  const [clickHandlerMenu, setClickHandlerMenu] = useState(false);
  const [clickUserHandlerMenu, setClickUserHandlerMenu] = useState(false);
  const toggleMenu = () => {
    setClickHandlerMenu(!clickHandlerMenu);
  };
  const handleDocumentClick = (event: MouseEvent) => {
    if (clickHandlerMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickHandlerMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [clickHandlerMenu])



  const toggleUserMenu = () => {
    setClickUserHandlerMenu(!clickUserHandlerMenu);
  }




  const menuRef = useRef<HTMLDivElement | null>(null);


  return (
    <>
      <header className="bg-white py-4 border-b-2 border-gray-100">
        <div className=" mx-auto">
          <div className="flex justify-between items-center w-full  py-3">
            <div>
              <Link href="/">
                <Image alt="logo" width={170} height={50} src="/assets/azizkala-logo-black.png" />
              </Link>
            </div>
            <div className="flex items-center lg:space-x-20  space-x-5">
              <nav className="hidden lg:flex space-x-6 xl:space-x-14">
                <Link className={`text-gray-700 font-[500] hover:text-gray-500 ${path == "/" ? "border-b-2 border-gray-500 border-opacity-80" : ""} `} href="/">
                  Home
                </Link>
                <Link className={`text-gray-700 font-[500] hover:text-gray-500 ${path == "/concat" ? "border-b-2 border-gray-500 border-opacity-80" : ""} `} href="/concat">
                  Contact
                </Link>
                <Link className={`text-gray-700 font-[500] hover:text-gray-500 ${path == "/about" ? "border-b-2 border-gray-500 border-opacity-80" : ""} `} href="/about">
                  About
                </Link>
                {isLogging ? (
                  <Link className={`text-gray-700 font-[500] hover:text-gray-500 ${path == "/auth/signup" ? "border-b-2 border-gray-500 border-opacity-80" : ""} `} href="/auth/signup">
                  Log Out
                </Link>
                ) : (
                  <Link className={`text-gray-700 font-[500] hover:text-gray-500 ${path == "/auth/signup" ? "border-b-2 border-gray-500 border-opacity-80" : ""} `} href="/auth/signup">
                    Sign Up
                  </Link>
                )}

              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center bg-gray-100 rounded-md overflow-hidden px-10 py-2">
                <IoSearch className="text-gray-500 w-[18px]" />
                <input
                  className="bg-transparent border-none outline-none placeholder-gray-500 text-sm"
                  placeholder="What are you looking?"
                  type="text"
                />
              </div>

              <Link href="/wish-list">
                <IoMdHeartEmpty className="text-gray-500 cursor-pointer" fontSize={25} />
              </Link>

              <Link href="/cart">
                <HiOutlineShoppingCart className="text-gray-500 cursor-pointer" fontSize={25} />
              </Link>

              {/* start my user section */}
              {isLogging ? (
                <FaRegCircleUser className="text-gray-500 cursor-pointer" fontSize={25} onClick={toggleUserMenu} />
              ) : (
                <div></div>
              )}
              {/* finish my user section */}

              <IoMdMenu className="text-gray-500 lg:hidden cursor-pointer" onClick={toggleMenu} fontSize={25} />
            </div>
          </div>
          <div className={`menu flex justify-end  lg:hidden pr-[150px] ${clickHandlerMenu ? "block" : "hidden"}`} ref={menuRef}>
            <Menu />
          </div>

          {/* start my user section */}
          {isLogging ? (
            <div className={`menu flex justify-end  pr-[150px] ${clickUserHandlerMenu ? "block" : "hidden"}`}>
              <UserMenu />
            </div>
          ) : (
            <div></div>
          )}
          {/* finish my user section */}

        </div>
      </header>
    </>
  )
}
