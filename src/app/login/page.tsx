"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { login } from "../api/login";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    await login();
  };

  return (
    <section className="flex flex-col items-center ">
      <Logo tag="h1" />
      <section className="flex flex-col border border-(--border) rounded-2xl p-10 w-auto md:w-1/3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="" className="mb-5 mt-2 text-sm">
          Forgot your password?{" "}
        </Link>
        <Button onClick={(e) => loginUser(e)}>Sign In</Button>
        <Link href="register" className="place-self-center">
          Create account
        </Link>
      </section>
    </section>
  );
};

export default LoginPage;
