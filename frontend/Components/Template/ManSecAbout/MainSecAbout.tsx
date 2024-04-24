import Image from "next/image";
import React from "react";

export default function MainSecAbout() {
  return (
    <>
      <div className="flex justify-between mt-[100px]">
        <div className="text flex flex-col gap-7 lg:w-[450px] 2xl:w-[500px] justify-center ">
          <h1 className="text-[54px] font-[500]">Our Story</h1>
          <p className="font-[500] opacity-90 ">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{" "}
          </p>
          <p className="font-[500] opacity-90 ">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="image">
          <Image src="/assets/MainSecAboutImage.png" alt="Image" width={1500} height={1500} className="w-[420px] h-[400px] xl:w-[600px] xl:h-[550px] 2xl:w-[650px] 2xl:h-[600px] hidden lg:block" />
        </div>
      </div>
    </>
  );
}
