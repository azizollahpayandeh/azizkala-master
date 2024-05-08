"use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Swal from 'sweetalert2';
// import axios from 'axios'; // Make sure you have axios installed
// import Button from "@/Components/Modules/Button/Button";
// import { useRouter } from 'next/navigation'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// export default function Page() {
//   const [userName, setUserName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter()


//   // Inside your component, assuming it's a functional component
//   const SignupSchema = Yup.object().shape({
//     userName: Yup.string()
//       .required('Name is required')
//       .matches(/^[a-zA-Z](?:[a-zA-Z0-9_-]{2,19})$/, 'The regex enforces username rules: it must start with a letter (uppercase or lowercase) and can be followed by letters, numbers, underscores, or hyphens. Usernames must be between 3 and 20 characters long.'),
//     phone: Yup.string()
//       .matches(/^(?:0|[1-9]\d*)(?:\.\d+)?$/, 'The regex allows positive integers with optional leading zeros, but does not allow other characters like decimals, commas, or signs.')
//       .min(11, 'Phone number must be 11 characters')
//       .max(11, 'Phone number must be 11 characters')
//       .required('Phone number is required'),
//     password: Yup.string()
//       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be strong with 8+ characters, including uppercase, lowercase, number, and special character, allowing common special characters.")
//       .required('Password is required'),
//   });

//   const signUp = async () => {
//     if (!phone || !userName || !password) {
//       Swal.fire('Validation error', 'All fields are required', 'error');
//       return;
//     }

//     try {
//       const endpoint = "http://127.0.0.1:8000/api/auth/register/";
//       const response = await axios.post(endpoint, {
//         phone_number: phone,
//         username: userName,
//         password: password
//       });

//       // the response based on the status code
//       switch (response.status) {
//         case 201:
//           Swal.fire({
//             title: 'Success',
//             text: 'Registration was successful',
//             icon: 'success'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               router.push('/auth/login', { scroll: false })
//             }
//           });
//           break;
//         case 500:
//           Swal.fire('Error', 'The phone number is duplicated', 'error');
//           break;
//         default:
//           Swal.fire('Error', 'Failed to sign up', 'error');
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         Swal.fire('Error', 'The phone number is duplicated', 'error');
//       } else {
//         Swal.fire('Error', 'Failed to sign up', 'error');
//       }
//       console.error(error);
//     }
//   };
//   return (
//     <Formik
//       initialValues={{ userName: '', phone: '', password: '' }}
//       validationSchema={SignupSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         signUp(values);
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div className="lg:grid lg:grid-cols-2 mt-[50px]">
//             <div className="pic hidden lg:block">
//               <Image
//                 src="/assets/Side Image.png"
//                 width={550}
//                 height={550}
//                 alt="Image"
//                 className="2xl:w-[650px] 2xl:h-[650px]"
//               />
//             </div>

//             <div className="flex justify-center">
//               <div className="flex flex-col justify-center w-auto xl:w-[400px] gap-[30px] 2xl:gap-[40px]">
//                 <div>
//                   <h1 className="text-[34px] font-[500]">Sign up to Exclusive</h1>
//                   <span className="text-[17px] opacity-80 font-[400]">
//                     Enter your details below
//                   </span>
//                 </div>

//                 <Field
//                   type="text"
//                   name="userName"
//                   placeholder="Name"
//                   className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//                 />
//                 <ErrorMessage name="userName" component="div" className="error" />

//                 <Field
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//                 />
//                 <ErrorMessage name="phone" component="div" className="error" />

//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//                 />
//                 <ErrorMessage name="password" component="div" className="error" />

//                 <div className="flex justify-between items-center">
//                   <button type="submit" disabled={isSubmitting}>
//                     <Button value="Sign up" />
//                   </button>
//                   <p className="">
//                     Already have an account?{" "}
//                     <span className="text-red text-[17px] font-[500] pl-[2px] ">
//                       <a href="/auth/login">login</a>
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };


// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Swal from 'sweetalert2';
// import axios from 'axios'; // Make sure you have axios installed
// import Button from "@/Components/Modules/Button/Button";
// import { useRouter } from 'next/navigation'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// export default function Page() {
//   const [userName, setUserName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter()

//   // Validation Schema with simplified regex and less verbose error messages
//   const SignupSchema = Yup.object().shape({
//     userName: Yup.string()
//       .required('Name is required')
//       .matches(/^[a-zA-Z][a-zA-Z0-9_-]{5,15}$/, 'Invalid username format'),
//     phone: Yup.string()
//       .matches(/^[0-9]{11}$/, 'Invalid phone number format')
//       .required('Phone number is required'),
//     password: Yup.string()
//       .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters long with letters and numbers")
//       .required('Password is required'),
//   });

//   const signUp = async (values) => {
//     if (!phone || !userName || !password) {
//       Swal.fire('Validation error', 'All fields are required', 'error');
//       return;
//     }

//     try {
//       const endpoint = "http://127.0.0.1:8000/api/auth/register/";
//       const response = await axios.post(endpoint, {
//         phone_number: phone,
//         username: userName,
//         password: password
//       });

//       // Handle response based on the status code
//       switch (response.status) {
//         case 201:
//           Swal.fire({
//             title: 'Success',
//             text: 'Registration was successful',
//             icon: 'success'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               router.push('/auth/login', { scroll: false })
//             }
//           });
//           break;
//         case 500:
//           Swal.fire('Error', 'The phone number is duplicated', 'error');
//           break;
//         default:
//           Swal.fire('Error', 'Failed to sign up', 'error');
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         Swal.fire('Error', 'The phone number is duplicated', 'error');
//       } else {
//         Swal.fire('Error', 'Failed to sign up', 'error');
//       }
//       console.error(error);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{ userName: '', phone: '', password: '' }}
//       validationSchema={SignupSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         signUp(values);
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div className="lg:grid lg:grid-cols-2 mt-[50px]">
//             <div className="pic hidden lg:block">
//               <Image
//                 src="/assets/Side Image.png"
//                 width={550}
//                 height={550}
//                 alt="Image"
//                 className="2xl:w-[650px] 2xl:h-[650px]"
//               />
//             </div>

//             <div className="flex justify-center">
//               <div className="flex flex-col justify-center w-auto xl:w-[400px] gap-[30px] 2xl:gap-[40px]">
//                 <div>
//                   <h1 className="text-[34px] font-[500]">Sign up to Exclusive</h1>
//                   <span className="text-[17px] opacity-80 font-[400]">
//                     Enter your details below
//                   </span>
//                 </div>

//                 <Field
//                   type="text"
//                   name="userName"
//                   value={userName}
//                   onChange={(event) => setUserName(event.target.value)}
//                   placeholder="Name"
//                   className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//                 />
//                 <ErrorMessage name="userName" component="div" className="error" />

//                 <Field
//                   type="text"
//                   name="phone"
//                   value={phone}
//                   onChange={(event) => setPhone(event.target.value)}
//                   placeholder="Phone Number"
//                   className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//                 />
//                 <ErrorMessage name="phone" component="div" className="error" />

//                 <Field
//                   type="password"
//                   name="password"
//                   value={password}
//                   onChange={(event) => setPassword(event.target.value)}
//                   placeholder="Password"
//                   className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
//                 />
//                 <ErrorMessage name="password" component="div" className="error" />

//                 <div className="flex justify-between items-center">
//                   <button type="submit" disabled={isSubmitting}>
//                     <Button value="Sign up" />
//                   </button>
//                   <p className="">
//                     Already have an account?{" "}
//                     <span className="text-red text-[17px] font-[500] pl-[2px] ">
//                       <a href="/auth/login">login</a>
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };


import React from "react";
import Image from "next/image";
import Swal from 'sweetalert2';
import axios from 'axios';
import Button from "@/Components/Modules/Button/Button";
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Page() {
  const router = useRouter()

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Name is required')
      .matches(/^[a-zA-Z][a-zA-Z0-9_-]{5,15}$/, 'Invalid username format'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Invalid phone number format')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters long with letters and numbers")
      .required('Password is required'),
  });

  const signUp = async (values) => {
    if (!values.phone || !values.userName || !values.password) {
      Swal.fire('Validation error', 'All fields are required', 'error');
      return;
    }

    try {
      const endpoint = "http://127.0.0.1:8000/api/auth/register/";
      const response = await axios.post(endpoint, {
        phone_number: values.phone,
        username: values.userName,
        password: values.password
      });

      switch (response.status) {
        case 201:
          Swal.fire({
            title: 'Success',
            text: 'Registration was successful',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/auth/login', { scroll: false })
            }
          });
          break;
        case 500:
          Swal.fire('Error', 'The phone number is duplicated', 'error');
          break;
        default:
          Swal.fire('Error', 'Failed to sign up', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Swal.fire('Error', 'The phone number is duplicated', 'error');
      } else {
        Swal.fire('Error', 'Failed to sign up', 'error');
      }
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ userName: '', phone: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        signUp(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
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

            <div className="flex justify-center">
              <div className="flex flex-col justify-center w-auto xl:w-[400px] gap-[30px] 2xl:gap-[40px]">
                <div>
                  <h1 className="text-[34px] font-[500]">Sign up to Exclusive</h1>
                  <span className="text-[17px] opacity-80 font-[400]">
                    Enter your details below
                  </span>
                </div>

                <Field
                  type="text"
                  name="userName"
                  placeholder="Name"
                  className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
                />
                <ErrorMessage name="userName" component="div" className="error" />

                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
                />
                <ErrorMessage name="phone" component="div" className="error" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="outline-none border-b-[2px] border-b-gray-400 lg:w-full w-[300px] pb-[5px]"
                />
                <ErrorMessage name="password" component="div" className="error" />

                <div className="flex justify-between items-center">
                  <button type="submit" disabled={false} className="bg-red inline-flex justify-center items-center rounded-[5px] text-[14px] font-[500] text-white w-[150px] h-[40px] hover:bg-hoverbtn transition-all duration-300">
                    Sign up
                  </button>
                  <p className="">
                    Already have an account?{" "}
                    <span className="text-red text-[17px] font-[500] pl-[2px] ">
                      <a href="/auth/login">login</a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
