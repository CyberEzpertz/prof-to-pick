import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { createServer } from '@/lib/supabase/server';
import { LogIn, LogOut } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  return <LoginForm />;
};

export default Login;
