"use client";
import { Link } from "next-scroll";
import React from "react";
import { UseScrollPosition } from "@/hooks/useScrollPosition/useScrollPosition";
import Image from "next/image";

export default function ScrollToTop() {
  const scrollPosition = UseScrollPosition();

  return (
    <>
      <Link to="MainSec">
        <div className={`${scrollPosition > 600 ? "block " : "hidden"}`}>
        <Image src={"/assets/fill with Up Arrow.png"} alt="to top" width={50} height={50} />
        </div>
      </Link>
    </>
  );
}
