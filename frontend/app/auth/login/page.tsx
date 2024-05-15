"use client"
// import Button from "@/Components/Modules/Button/Button";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import Axios from 'axios';
// import { useRouter } from 'next/navigation'
// import Swal from 'sweetalert2';
// import { setCookie } from 'cookies-next';
// import { getCookie } from "cookies-next";




// export default function Page() {
//   const [phone, setphone] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter()
//   const token = getCookie('access'); 
//   // console.log(token);
  





//   const handleLogin = async (e) => {
//     e.preventDefault(); // جلوگیری از رفرش صفحه
//     try {
//       const response = await Axios.post('http://127.0.0.1:8000/api/auth/login/', {
//         phone_number: phone,
//         password
//       });

//       if (response.status === 200) {
//         // ذخیره توکن‌ها در کوکی
//         setCookie('access', `bearer ${response.data.access}`);
//         // Cookie.set('accessToken', response.data.access);
//         // Cookie.set('refreshToken', response.data.refresh);

//         // نمایش پیغام موفقیت
//         Swal.fire({
//           title: 'successfull!',
//           text: 'you loged in successfully',
//           icon: 'success',
//           confirmButtonText: 'ok'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             router.push('/', { scroll: false })
//           }
//         });
//       }
//     } catch (error) {
//       // نمایش خطا
//       Swal.fire({
//         title: 'error!',
//         text: error.response.data.detail,
//         icon: 'error',
//         confirmButtonText: 'ok'
//       });
//     }
//   };


//   return (
//     <>
//       <div className="lg:grid lg:grid-cols-2 mt-[50px]">
//         <div className="pic hidden lg:block">
//           <Image
//             src="/assets/Side Image.png"
//             width={550}
//             height={550}
//             alt="Image"
//             className="2xl:w-[650px] 2xl:h-[650px]"
//           />
//         </div>

//         <div className="flex justify-center ">
//           <div className="  flex flex-col justify-center w-auto  xl:w-[400px]  gap-[30px] 2xl:gap-[40px] ">
//             <div>
//               <h1 className="text-[34px] font-[500]">Log in to Exclusive</h1>
//               <span className="text-[17px] opacity-80 font-[400]">
//                 Enter your details below
//               </span>
//             </div>

//             <input
//               type="tel"
//               placeholder="inter your phone"
//               className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//               value={phone}
//               onChange={(e) => setphone(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="password"
//               className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className="flex justify-between items-center">
//               <Link href="#" onClick={handleLogin} >
//                 <Button value="log in" />
//               </Link>
//               <Link href="">
//                 <p className=" text-red hover:text-hoverbtn">
//                   forget password?
//                 </p>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import Button from "@/Components/Modules/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Axios from 'axios';
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import { setCookie } from 'cookies-next';
import { getCookie } from "cookies-next";


export default function Page() {
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const token = getCookie('access');

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://127.0.0.1:8000/api/auth/login/', {
        phone_number: phone,
        password
      });

      if (response.status === 200) {
        setCookie('access', response.data.access);
        Swal.fire({
          title: 'uccessfull!',
          text: 'you loged in successfully',
          icon: 'uccess',
          confirmButtonText: 'ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/', { scroll: false });
          }
        });
      }
    } catch (error:any) {
      Swal.fire({
        title: 'error!',
        text: error.response.data.detail,
        icon: 'error',
        confirmButtonText: 'ok'
      });
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await Axios.get('http://127.0.0.1:8000/api/dashboard/', {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NzYwNjk3LCJpYXQiOjE3MTU2NzQyOTcsImp0aSI6IjZiNzczNGI2YzFiNTRlMGRhYTA3ZWM2ZGNkNzMyMGYyIiwidXNlcl9pZCI6MzR9.IoQLV5Bf3yKPjIGS3c2yNXzgLSZ5SAGGltJbGeKz-MA`,
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     console.log(response.data);
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 mt-[50px]">
        <div className="pic hidden lg:block">
          <Image
            src="/assets/Side Image.png"
            width={550}
            height={550}
            alt="Image"
            className="2xl:w-[650px] 2xl:h-[650px]"
          />
        </div>

        <div className="flex justify-center ">
          <div className="  flex flex-col justify-center w-auto  xl:w-[400px]  gap-[30px] 2xl:gap-[40px] ">
            <div>
              <h1 className="text-[34px] font-[500]">Log in to Exclusive</h1>
              <span className="text-[17px] opacity-80 font-[400]">
                Enter your details below
              </span>
            </div>

            <input
              type="tel"
              placeholder="inter your phone"
              className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <Link href="#" onClick={handleLogin}>
                <Button value="log in" />
              </Link>
              <Link href="">
                <p className=" text-red hover:text-hoverbtn">
                  forget password?
                </p>
              </Link>
            </div>
            {/* <button onClick={fetchData}>Fetch Data</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
