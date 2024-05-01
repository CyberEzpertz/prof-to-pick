'use server';

import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';

export async function updateUserId({ idNumber }: { idNumber: number }) {
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
}

export async function checkIsAdmin() {
  const supabase = createServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: data.user.id,
    },
    select: {
      role: true,
    },
  });

  return user?.role === 'ADMIN';
}
