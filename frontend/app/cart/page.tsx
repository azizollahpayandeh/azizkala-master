"use client";
import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from 'cookies-next';
import Link from "next/link";

export default function Page() {
  const [cartItems, setCartItems] = useState({ cart_items: [] });
  const [error, setError] = useState(null);

  // Create a formatter for currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleclick = () => {
    window.location.reload();
  }

  useEffect(() => {
    const token = getCookie('access');
    console.log('Token:', token);

    axios.get('http://127.0.0.1:8000/api/cart/', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        setCartItems(response.data);
        console.log("Data received: ", response.data);
      })
      .catch((error) => {
        setError('There was an error making the GET request');
        console.error("Error: ", error);
      });
  }, []);

  const addItemToCart = async (body) => {
    try {
      const token = getCookie('access');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/cart/add-or-remove/',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      console.log("Response received: ", response.data);
    } catch (error) {
      console.error("Error during POST request: ", error);
    }
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
            {cartItems.cart_items.map((item, index) => (
              <div key={index} className="product flex justify-between shadow-md h-[80px] items-center rounded-lg">
                <div className="flex gap-3">
                  <Image
                    src={item.cover_image}
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
                  {formatCurrency(item.price)}
                </p>
                <p className="lg:text-[16px] text-[14px] font-[400] pr-[70px] lg:pr-[150px]">
                  {item.quantity}
                </p>
                <p className="lg:text-[16px] text-[14px] font-[400] pr-[20px] lg:pr-[30px]">
                  {formatCurrency(item.total_price_with_discount)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-[20px]">
            <Link href="/">
              <button className="border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 hover:text-white hover:border-none inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] w-[150px] h-[40px] hover:bg-red transition-all duration-300">
                Return to Shop
              </button>
            </Link>
            <button className="border border-y-1 border-y-slate-900 border-x-1 border-x-slate-900 hover:text-white hover:border-none inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] w-[150px] h-[40px] hover:bg-red transition-all duration-300" onClick={handleclick}>
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
              <p className="text-[17px]">{formatCurrency(cartItems.total_price_with_discount)}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-[17px]">Shipping:</p>
              <p className="text-[17px]">Free</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-[17px]">Total:</p>
              <p className="text-[17px]">{formatCurrency(cartItems.total_price_with_discount)}</p>
            </div>
            <div className="flex justify-center items-center">
              <Link href={'/checkout'}>
                <Button value="Proceed to Checkout" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
