"use client";
import React from "react";
import Image from "next/image";
import Swal from 'sweetalert2';
import axios from 'axios';
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
