import CartService from "@/Components/Modules/CartService/CartService";
import React from "react";

export default function Services() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-20 xl:gap-36 2xl:gap-56 ">
        <CartService
          title="FREE AND FAST DELIVERY"
          desc="Free delivery for all orders over $140"
          ImageAddress="/assets/Services.png"
        />
        <CartService
          title="24/7 CUSTOMER SERVICE"
          desc="Friendly 24/7 customer support"
          ImageAddress="/assets/Services (1).png"
        />
        <CartService
          title="MONEY BACK GUARANTEE"
          desc="We reurn money within 30 days"
          ImageAddress="/assets/Services (2).png"
        />
      </div>
    </>
  );
}
