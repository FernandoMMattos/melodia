"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const register = (
    e: FormEvent,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;

    registerUser(email, password);
  };

  return (
    <section className="flex flex-col items-center ">
      <Logo tag="h1" />
      <form
        className="flex flex-col border border-(--border) rounded-2xl p-10 w-auto md:w-1/3"
        onSubmit={(e) => register(e, email, password, confirmPassword)}
      >
        <Label htmlFor="email">E-mail</Label>
        <Input
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="confirmPassword">Password</Label>
        <Input
          name="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label htmlFor="confirmPassword">Confirm your password</Label>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Link href="login" className="mb-5 mt-2 text-sm">
          Already have an account?
        </Link>
        <Button type="submit">Create Account</Button>
      </form>
    </section>
  );
};

export default RegisterPage;
