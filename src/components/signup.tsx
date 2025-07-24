"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Input from "./input";
import { signupResponse } from "../types/auth/authType";
import { useRouter } from "next/navigation";
export function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);
    if (!formData.email || !formData.email || !formData.password) {
      return toast.error("please enter all the fields!");
    }
    try {
      const res = await axios.post<signupResponse>(
        "/api/auth/signup",
        formData
      );
      console.log("response:", res);
      const data = res.data;
      if (data.success) {
        setIsLoading(false)
        toast.success(data.message || "signed up successfully!");
        router.push("/");
      } else {
        toast.error(data.message || "signed up failed!");
        setIsError(true)
        setIsLoading(false)
      }
    } catch (error: any) {
        setIsLoading(false)
        console.log("faild signup!", error);
        setIsError(true)
        toast.error(error?.data?.message || "failed to signup!");
    }finally{
        setIsLoading(false)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name , value} = e.target
    setFormData((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
    }))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <Input
          label="Username"
          name="userName"
          type="text"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {isError && <p className="mt-4 text-red-500 text-center">{isError}</p>}
    </div>
  );
}


