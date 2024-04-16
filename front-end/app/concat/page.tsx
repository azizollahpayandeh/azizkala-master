import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex justify-center ">
        <div className="allConcat mt-[150px] lg:grid lg:grid-cols-3 gap-20  ">

          <div className="left flex flex-col gap-7 ">
            <div className="top flex flex-col gap-5">
              <div className="logo flex items-center gap-3">
                <Image src="/assets/icons-phone.png" width={35} height={35} alt="icons-phone" />
                <h1 className="font-[500]">Call To Us</h1>
              </div>
              <p className="text-[15px]">We are available 24/7, 7 days a week.</p>
              <p className="text-[15px]">Phone: +8801611112222</p>
            </div>
            <hr className="w-[300px] text-black "/>
            <div className="bottom flex flex-col gap-5">
            <div className="logo flex items-center gap-3">
                <Image src="/assets/icons-mail.png" width={35} height={35} alt="icons-mail" />
                <h1 className="font-[500]">Write To Us</h1>
              </div>
              <p className="text-[15px]">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-[15px]">Emails: customer@exclusive.com</p>
              <p className="text-[15px]">Emails: support@exclusive.com</p>
            </div>
          </div>


          <div className="right col-span-2 flex flex-col lg:flex-row lg:justify-end pt-[50px] lg:pt-[0px]">
            <div className="xl:w-[735px] lg:w-[550px]">
              
            <div className="top flex lg:justify-between pb-[25px] flex-col lg:flex-row gap-7 lg:gap-0  ">
              <input type="text" placeholder="name:" className="bg-[#F7F7FC] pl-[7px] text-[14px] w-[350px] lg:w-[180px] xl:w-[215px] 2xl:w-[230px] h-[50px] rounded-md"/>
              <input type="email" placeholder="email:" className="bg-[#F7F7FC] pl-[7px] text-[14px] w-[350px] lg:w-[180px] xl:w-[215px] 2xl:w-[230px] h-[50px] rounded-md"/>
              <input type="tel" placeholder="phone:" className="bg-[#F7F7FC] pl-[7px] text-[14px] w-[350px] lg:w-[180px] xl:w-[215px] 2xl:w-[230px] h-[50px] rounded-md"/>
            </div>
            <div className="bottom ">
              <textarea placeholder="your message:" className="bg-[#F7F7FC] pl-[7px] text-[14px] w-[350px] h-[150px] pt-[7px] lg:w-[550px] xl:w-[737px] lg:h-[205px] rounded-md"></textarea>
            </div>
            <div className="botton flex lg:justify-end justify-start pt-[20px]">
            <Button value="send message"/>
            </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
