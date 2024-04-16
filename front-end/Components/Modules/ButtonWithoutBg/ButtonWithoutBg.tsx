import React from "react";

interface ButtonProps {
    value: string;
  }
  

export default function ButtonWithoutBg({value}:ButtonProps) {
  return (
    <>
      <div>
        <button className="border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 hover:text-white hover:border-none inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] w-[150px] h-[40px] hover:bg-red transition-all duration-300">
          {value}
        </button>
      </div>
    </>
  );
}
