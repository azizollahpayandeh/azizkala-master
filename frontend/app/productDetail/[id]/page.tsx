"use client";
import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';

export default function Page() {
  const router = useRouter();
  const id = usePathname();
  const idNumber = id.split("/").pop();

  const [productSize, setProductSize] = useState("");
  const [count, setCount] = useState(0);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product-detail/${idNumber}/`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        setError("There was an error making the GET request");
        console.error(error);
      });
  }, [idNumber]);

  const minusCount = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const plusCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleBuyNow = async () => {
    const token = getCookie('access'); // گرفتن توکن از کوکی

    const body = {
      product: idNumber,
      quantity: count,
      color: "red",
      size: productSize
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/cart/add-or-remove/',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // اضافه کردن توکن در هدر درخواست
            "Content-Type": "application/json"
          }
        }
      );
      
      Swal.fire({
        title: 'Success!',
        text: 'The product has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'Go to cart'
      }).then(() => router.push("/cart"));
      
    } catch (error) {
      console.error('There was an error making the POST request', error);

      // نمایش پیام خطا با اطلاعات دقیق‌تر از سرور
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.detail || 'There was an error adding the product to your cart.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  return (
    <>
      <div className="flex flex-col">
        <div className="all flex flex-col justify-center lg:flex-row md:justify-between 2xl:justify-evenly mt-[100px]">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row lg:gap-10 w-full lg:w-95%">
              <div className="hidden lg:flex lg:flex-col lg:gap-4">
                {productData?.images?.slice(0, 4).map((image) => (
                  <Image
                    key={image.id} // Use image.id as the key
                    src={image.image} // Ensure this points to the correct URL
                    alt="productImages"
                    width={170}
                    height={138}
                    className="cursor-pointer"
                  />
                ))}
              </div>

              <div className="hidden lg:block">
                <Image
                  src={productData?.images[2]?.image}
                  alt="productImages"
                  width={1000}
                  height={600}
                  className="h-full w-[95%]"
                />
              </div>
            </div>
          </div>

          <div className="details w-[350px] md:w-[450px] flex flex-col justify-center lg:justify-start gap-2">
            <h1 className="text-[24px]">{productData?.product_name}</h1>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/Four Star.png"
                alt="productImages"
                width={85}
                height={20}
              />
              <p className="text-[14px] opacity-50">(150 Reviews)</p>
              <p>|</p>
              <p className="text-[14px] text-[#00FF66] opacity-70">In Stock</p>
            </div>
            <p className="text-[24px]">${productData?.price}</p>
            <p className="text-[14px] opacity-80 pt-[10px] pb-[15px]">
              {productData?.short_description}
            </p>
            <hr className="pt-[15px]" />
            <div className="flex gap-2 items-center">
              <p className="text-[20px] pr-[10px]">Colors:</p>
              <Image
                src="/assets/Ellipse 8.png"
                width={14}
                height={14}
                alt="color"
                className="cursor-pointer"
              />
              <Image
                src="/assets/Group 1000005935.png"
                width={14}
                height={14}
                alt="color"
                className="cursor-pointer"
              />
            </div>
            <div className="flex gap-3 pt-[10px] ">
              <p className="text-[20px] pr-[10px] ">Size:</p>
              {sizeOptions.map((size) => (
                <div
                  key={size}
                  className={`w-[32px] cursor-pointer h-[32px] border flex justify-center items-center hover:bg-red hover:text-white hover:border-none rounded-sm ${productSize === size ? "bg-red text-white border-none" : ""}`}
                  onClick={() => setProductSize(size)}
                >
                  <p className="text-[14px] opacity-90 ">{size}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-[20px]">
              <div className="md:w-[160px] w-[140px] border flex">
                <div
                  className="border-r w-[40px] flex justify-center items-center hover:bg-red hover:text-white cursor-pointer"
                  onClick={minusCount}
                >
                  -
                </div>
                <div className="w-[80px] flex justify-center items-center">
                  {count}
                </div>
                <div
                  className="border-l w-[40px] flex justify-center items-center hover:bg-red hover:text-white cursor-pointer"
                  onClick={plusCount}
                >
                  +
                </div>
              </div>
              <div onClick={handleBuyNow}>
                <Button value="Buy Now"  />
              </div>
              <div>
                <div className="w-[40px] h-full border flex justify-center items-center cursor-pointer rounded-sm">
                  <CiHeart className="w-[20px] h-[20px]" />
                </div>
              </div>
            </div>

            <div className="border w-full h-[180px] mt-[20px]">
              <div className="border-b flex gap-3 items-center p-[20px]">
                <TbTruckDelivery className="w-[30px] h-[30px]" />
                <div>
                  <p>Free Delivery</p>
                  <p className="text-[12px]">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center p-[20px]">
                <GiReturnArrow className="w-[30px] h-[30px]" />
                <div>
                  <p>Return Delivery</p>
                  <p className="text-[12px]">Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
