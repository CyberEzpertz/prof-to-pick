'use server';

import { createServer } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signIn = async () => {
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

export const validateCode = (code: string) => {
  if (code === process.env.BETA_CODE) return true;
  else return false;
};
