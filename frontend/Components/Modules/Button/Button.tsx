import React from "react";

interface ButtonProps {
  value: string;
}

export default function Button({ value }: ButtonProps) {
  return (
    <>
      <div className="">
        <button
          className={`bg-red inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] text-white w-[150px] h-[40px] hover:bg-hoverbtn transition-all duration-300`}
        >
          {value}
        </button>
      </div>
    </>
  );
}
