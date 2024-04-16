import Image from 'next/image'
import React from 'react'

export default function CategoryPicture() {
  return (
    <div className='mt-[110px]'>
        <Image width={1170} height={500} alt='Frame 600' src="/assets/Frame 600.png" className='w-[100vw] h-[50vw] md:h-auto'/>
    </div>
  )
}
