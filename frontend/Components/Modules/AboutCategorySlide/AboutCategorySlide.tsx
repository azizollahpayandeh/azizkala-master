import Image from 'next/image'
import React from 'react'

export default function AboutCategorySlide() {
  return (
    <>
      <div className="cursor-pointer flex justify-center items-center ">
        <div className="w-[180px] h-[190px] rounded-[4px] border-2 flex justify-center items-center cursor-pointer hover:bg-red hover:text-white transition-all duration-500">
          <div className="flex justify-center items-center flex-col gap-3">
          <Image
          width={60}
          height={60}
          alt="Frame685"
          src={'/assets/Services.png'}
        />
            <h4 className=  " text-[32px] font-semibold">25.5K</h4>
            <p className=''>sallers actie our site</p>
          </div>
        </div>
      </div>
    </>
  )
}
