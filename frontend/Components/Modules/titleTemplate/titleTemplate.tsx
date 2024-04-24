import Image from 'next/image'
import React from 'react'

interface TitleTemplateProps {
  title: string
}

export default function TitleTemplate({title}:TitleTemplateProps) {
  return (
    <>
        <div className='flex gap-3 items-center'>
            <Image width={15} height={15} alt='' src="/assets/Rectangle 18.png"/>
            <h2 className='text-red text-[17px] font-[600] leading-[20px]'>{title}</h2>
        </div>
    </>
  )
}
