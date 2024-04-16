import React from "react";
import { HiOutlineDesktopComputer } from "react-icons/hi";

export default function ProductCard() {
  return (
    <>
      <div className="cursor-pointer flex justify-center items-center ">
        <div className="w-[170px] rounded-[4px] border-2 h-[145px] flex justify-center items-center cursor-pointer hover:bg-red hover:text-white transition-all duration-500">
          <div className="flex justify-center items-center flex-col gap-3">
              <HiOutlineDesktopComputer className="w-[56px] h-[56px]" />
            <h4 className=  "font-[400] text-[16px]">computer</h4>
          </div>
        </div>
      </div>
    </>
  );
}
