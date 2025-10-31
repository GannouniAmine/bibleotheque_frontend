'use client';
import { FormEvent, useState } from "react";
import { Login } from "../../api/authenticationApi";
import { LoignInfo } from "@/model/LoignInfo.entity";
import Input from "@/sharedComponent/Input";


export default function LoginPage() {
  const [user, setUser] = useState<LoignInfo>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await Login(user);
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

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
              {" "}Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
