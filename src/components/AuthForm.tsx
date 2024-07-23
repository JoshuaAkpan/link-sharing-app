"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';
import { signIn, signUp } from '../lib/auth';
import { updateProfile } from '../lib/profile';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const user = await signUp(email, password);
        // Create a basic profile for the new user
        await updateProfile(user.uid, {
          firstName: '',
          lastName: '',
          email: user.email || '',
        });
      }
      router.push('/dashboard/links');
    } catch (err) {
      console.error(err);
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {!isLogin && (
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit">{isLogin ? "Login" : "Create account"}</Button>
    </form>
  );
};

export default AuthForm;
