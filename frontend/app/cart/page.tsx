"use client"
import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cart/')
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        setError('There was an error making the GET request');
        console.error(error);
      });
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <div>
        <div className="allcarts mt-[100px]">
          <div className="title flex justify-between shadow-xl h-[60px] items-center rounded-lg">
            <p className="text-[16px] font-[500] pl-[30px]">Product</p>
            <p className="text-[16px] font-[500]">Price</p>
            <p className="text-[16px] font-[500]">Quantity</p>
            <p className="text-[16px] font-[500] pr-[30px]">Subtotal</p>
          </div>

          <div className="products pt-[40px] flex flex-col gap-9">
            {cartItems.map((item, index) => (
              <div key={index} className="product flex justify-between shadow-md h-[80px] items-center rounded-lg">
                <div className="flex gap-3">
                  <Image
                    src={item.image}
                    alt="productImage"
                    width={70}
                    height={39}
                    className="pl-[30px] w-[35px] lg:w-[70px] hidden lg:block"
                  />
                  <p className="lg:text-[16px] text-[14px] font-[400] pl-[30px]">
                    {item.product_name}
                  </p>
                </div>
                <p className="lg:text-[16px] text-[14px] font-[400] pr-[40px] lg:pr-[140px]">
                  ${item.price}
                </p>
                <p className="lg:text-[16px] text-[14px] font-[400] pr-[70px] lg:pr-[150px]">
                  {item.quantity}
                </p>
                <p className="lg:text-[16px] text-[14px] font-[400] pr-[20px] lg:pr-[30px]">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-[20px]">
            <button className="border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 hover:text-white hover:border-none inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] w-[150px] h-[40px] hover:bg-red transition-all duration-300">
              Return to Shop
            </button>
            <button className="border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 hover:text-white hover:border-none inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] w-[150px] h-[40px] hover:bg-red transition-all duration-300">
              Update Cart
            </button>
          </div>
        </div>

        <div className="lastPart flex items-center lg:items-start justify-center flex-col lg:flex-row gap-10 lg:gap-0 lg:justify-between mt-[100px]">
          <div className="coupon flex gap-3">
            <input
              type="text"
              placeholder="Coupon Code"
              className="lg:w-[250px] w-[185px] pl-[10px] text-[15px] h-[40px] border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 rounded-sm"
            />
            <Button value="Apply Coupon" />
          </div>

          <div className="CartTotal flex flex-col p-[15px] gap-4 rounded-lg border border-y-2 border-y-slate-900 border-x-2 border-x-slate-900 lg:w-[415px] w-[352px] h-[280px]">
            <h2 className="text-[20px] font-[500]">Cart Total</h2>
            <div className="flex justify-between">
              <p className="text-[17px]">Subtotal:</p>
              <p className="text-[17px]">${calculateSubtotal()}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-[17px]">Shipping:</p>
              <p className="text-[17px]">Free</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-[17px]">Total:</p>
              <p className="text-[17px]">${calculateSubtotal()}</p>
            </div>
            <div className="flex justify-center items-center">
              <Link href={'/checkout'}>
                <Button value="Proceed to Checkout" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
