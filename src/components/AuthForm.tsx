"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import { signIn, signUp } from "../lib/auth";
import { updateProfile } from "../lib/profile";

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = "Can't be empty";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Please check again";
    } else if (password.length < 8) {
      newErrors.password = "Must be at least 8 characters";
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        const user = await signUp(email, password);
        await updateProfile(user.uid, {
          firstName: "",
          lastName: "",
          email: user.email || "",
        });
      }
      router.push("/dashboard/links");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Authentication failed. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        type="email"
        placeholder="e.g. alex@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        icon="email"
        label="Email address"
      />
      <Input
        type="password"
        placeholder={`${
          isLogin ? "Enter your password" : "At least 8 characters"
        }`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        icon="password"
        label={`${
          isLogin ? "Password" : "Create password"
        }`}
      />
      {!isLogin && (
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          icon="password"
          label="Confirm password"
        />
      )}
      {!isLogin && (
        <p className="text-[#737373] text-[12px]">
          Password must contain at least 8 characters
        </p>
      )}
      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}
      <Button type="submit">{isLogin ? "Login" : "Create new account"}</Button>
    </form>
  );
};

export default AuthForm;
