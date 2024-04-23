import TitleTemplate from "@/Components/Modules/titleTemplate/titleTemplate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Featured() {
  return (
    <>
      <div className="mt-[120px] ">
        <div className="title">
          <TitleTemplate title="Featured" />
          <h1 className="md:text-[36px] text-[30px] font-[600] ">
            New Arrival
          </h1>
        </div>

        <div className="context flex flex-col xl:flex-row xl:justify-between gap-10 xl:items-end pt-[50px] xl:pt-[40px]  justify-center items-center   ">
          <div className="">
            <Link href="/About">
              <Image
                width={570}
                height={600}
                alt="Frame684"
                src="/assets/Frame 684.png"
                className=" w-[100%]   2xl:w-[720px] 2xl:h-[626px] md:h-[625px]"
              />
            </Link>
          </div>

          <div className=" flex flex-col justify-between md:gap-10 pt-[40px]">
            <div className="">
              <Link href="/About">
                <Image
                  width={600}
                  height={250}
                  alt="Frame685"
                  src="/assets/Frame 685.png"
                  className="md:h-[269px] hidden md:block 2xl:h-auto"
                />
              </Link>
            </div>

            <div className=" flex flex-col justify-center items-center  md:flex md:flex-row md:justify-between  gap-10">
              <Link href="/About">
                <Image
                  width={270}
                  height={250}
                  alt="Frame686"
                  src="/assets/Frame 686.png"
                  className="h-[269px] 2xl:h-auto"
                />
              </Link>
              <Link href="/About">
                <Image
                  width={270}
                  height={250}
                  alt="Frame687"
                  src="/assets/Frame 687.png"
                  className="h-[269px] 2xl:h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
