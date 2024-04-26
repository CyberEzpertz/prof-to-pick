'use server';

import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const updateUserId = async ({ idNumber }: { idNumber: number }) => {
  const supabase = createServer();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) return;

  const user = await prisma.user.update({
    where: {
      id: userData.user.id,
    },
    data: {
      idNumber: idNumber,
    },
  });

  return user;
};
