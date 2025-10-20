'use client';
import { useRouter } from "next/navigation"
import { FormEvent,useState } from "react"
import Swal from "sweetalert2";

export default function LoginPage() {
  const [user , setUser] = useState({
    email : '' ,
    password : ''
  })
 
function handleChange(e : React.ChangeEvent<HTMLInputElement>){
  const { name , value} = e.target
  setUser({
    ...user,
    [name] : value
  })
}


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token' , data.access_token)
      window.location.href = '/dashboard'
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "False information",
      })
   
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <img
            src="/biblogo.png"
            alt="Your Company"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="text-center text-2xl font-bold tracking-tight text-black dark:text-white">
            Sign in to your account
          </h2>

          <form action="#" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value = {user.email}
                  onChange ={handleChange}
                  placeholder="name@mail.com"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 
                             text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 
                             focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white 
                             dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value = {user.password}
                   onChange ={handleChange}
                   placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 
                             text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 
                             focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white 
                             dark:placeholder-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold 
                         text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Not a member?
            <a
              href="/signup"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              {" "}
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
