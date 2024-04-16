import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <>
      <div className="mt-[100px] flex flex-col lg:flex-row lg:justify-between 2xl:justify-start 2xl:gap-[400px]">
        <div className="inputs ">
          <div>
            <h1 className="text-[34px] font-[500]">Billing Details</h1>
          </div>
          <div className="flex flex-col gap-5 pt-[20px]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="opacity-60">
                firstName<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Company Name" className="opacity-60">
                Company Name
              </label>
              <input
                type="text"
                id="Company Name"
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Street Address " className="opacity-60">
                Street Address<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="Street Address "
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="Apartment, floor, etc. (optional)"
                className="opacity-60"
              >
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                id="Apartment, floor, etc. (optional)"
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Towm/City" className="opacity-60">
                Towm/City<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="Towm/City"
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Phone Number" className="opacity-60">
                Phone Number<span className="text-red">*</span>
              </label>
              <input
                type="tel"
                id="Phone Number"
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Email Address" className="opacity-60">
                Email Address<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="Email Address"
                className="bg-[#F7F7FC] pl-[7px] w-[90%] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] h-[50px] rounded-md"
              />
            </div>

            <div className="flex">
              <input type="checkbox" className="bg-red text-red" />
              <span className="pl-[3px] text-[15px] lg:text-[16px]">
                Save this information for faster check-out next time
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <div className="details lg:w-[415px] w-[352px]  pt-[96px] gap-5">
            <div className="flex flex-col gap-6">
              <div className=" flex justify-between ">
                <div className="flex gap-3">
                  <Image
                    src="/assets/g27cq4-500x500 1.png"
                    alt="productImage"
                    width={50}
                    height={39}
                    className=" lg:w-[50px] hidden lg:block"
                  />
                  <span>LCD Monitor</span>
                </div>
                <div>
                  <span>$650</span>
                </div>
              </div>
              <div className=" flex justify-between ">
                <div className="flex gap-3">
                  <Image
                    src="/assets/g27cq4-500x500 1.png"
                    alt="productImage"
                    width={50}
                    height={39}
                    className=" lg:w-[50px] hidden lg:block"
                  />
                  <span>LCD Monitor</span>
                </div>
                <div>
                  <span>$650</span>
                </div>
              </div>
              <div className=" flex justify-between ">
                <div className="flex gap-3">
                  <Image
                    src="/assets/g27cq4-500x500 1.png"
                    alt="productImage"
                    width={50}
                    height={39}
                    className=" lg:w-[50px] hidden lg:block"
                  />
                  <span>LCD Monitor</span>
                </div>
                <div>
                  <span>$650</span>
                </div>
              </div>
              
              <div className=" flex justify-between  ">
                <div className="flex gap-3">
                  <Image
                    src="/assets/g27cq4-500x500 1.png"
                    alt="productImage"
                    width={50}
                    height={39}
                    className=" lg:w-[50px] hidden lg:block"
                  />
                  <span>LCD Monitor</span>
                </div>
                <div>
                  <span>$650</span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-4 pt-[40px]">
              <div className="flex justify-between">
                <p className="text-[17px]">Subtotal:</p>
                <p className="text-[17px]">$1450</p>
              </div>
              <hr />

              <div className="flex justify-between">
                <p className="text-[17px]">Shipping:</p>
                <p className="text-[17px]">Free</p>
              </div>
              <hr />

              <div className="flex justify-between">
                <p className="text-[17px]">Total:</p>
                <p className="text-[17px]">$1475</p>
              </div>
            </div>

            <div className="waOfPay flex flex-col gap-4 pt-[40px] pb-[40px]">
              <div className="banks flex justify-between">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <span>Banks</span>
                </div>

                <Image
                  src="/assets/Frame 834.png"
                  width={192}
                  height={28}
                  alt="banks"
                />
              </div>
              <div className="cash flex gap-2">
                <input type="checkbox" />
                <span>Cash on delivery</span>
              </div>
            </div>

            <div className="coupon flex gap-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="lg:w-[250px] w-[185px] pl-[10px] text-[15px] h-[40px] border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 rounded-sm "
              />
              <Button value="Apply Coupon" />
            </div>
            <div className="pt-[15px]">
              <Button value="Place Order" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
