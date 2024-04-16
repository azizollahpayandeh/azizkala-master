import SideBar from "@/Components/Modules/SideBar/SideBar";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="flex mt-[100px]">
      <div className="sidebar w-[30%]">
        <SideBar></SideBar>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
