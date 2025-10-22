'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Register } from "../../api/authenticationApi";


export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [userData , setUserData] = useState({
    email : '',
    nom : '',
    password : '' ,
    repeatPassword : ''
  })
  async function handleChange(e : React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
  })
  }

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(await Register(userData , setError)){
      router.push('/login')
  }}


 


  return (

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="/biblogo.png"
          alt="logo"
        />
      </a>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          {error && (
              <div className="text-red-500 bg-red-100 border border-red-300 p-2 rounded text-center">
                {error}
              </div>
          )}
          <form className="space-y-4 md:space-y-6" action="#" onSubmit= {handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value = {userData.email}
                onChange = {handleChange}
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
             <label
                htmlFor="FullName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your FullName
              </label>
              <input
                type="fullname"
                name="nom"
                id="fullname"
                value = {userData.nom}
                onChange = {handleChange}
                placeholder="First Name Last Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value = {userData.password}
                onChange = {handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="repeatPassword"
                id="confirm-password"
                value = {userData.repeatPassword}
                onChange = {handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
              Create an account
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

