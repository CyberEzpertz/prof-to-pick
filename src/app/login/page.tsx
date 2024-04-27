import { Button } from '@/components/ui/button';
import { createServer } from '@/lib/supabase/server';
import { LogIn, LogOut } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const signIn = async () => {
  'use server';
  const supabase = createServer();
  const origin = headers().get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error(error);
  } else {
    return redirect(data.url);
  }
};

const Login = () => {
  return (
    <form
      action={signIn}
      className="flex min-h-screen flex-1 items-center justify-center"
    >
      <Button className="group flex h-max flex-col gap-4 p-8" variant="outline">
        <FaGoogle
          size={100}
          className="fill-slate-300 transition-colors duration-300 group-hover:fill-teal-400"
        />
        Sign in with Google
      </Button>
    </form>
  );
};

export default Login;
