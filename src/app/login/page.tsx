import { Button } from '@/components/ui/button';
import { createServer } from '@/lib/supabase/server';
import { LogIn, LogOut } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

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
    console.log(error);
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
      <Button className="flex gap-2">
        <LogIn />
        Sign in with Google
      </Button>
    </form>
  );
};

export default Login;
