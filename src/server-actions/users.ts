'use server';

import prisma from '@/db/prisma/prisma';
import { getCurrUserId } from '@/lib/fetch';
import { createServer } from '@/lib/supabase/server';
import { inviteFormSchema } from '@/lib/types';
import { Prisma } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

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

  if (data.user === null || error) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: data.user.id,
    },
    select: {
      role: true,
    },
  });

  return user!.role === 'ADMIN';
}

export async function createInvite(data: z.infer<typeof inviteFormSchema>) {
  const userId = await getCurrUserId();

  try {
    const invite = await prisma.invite.create({
      data: {
        email: data.email,
        userId: userId,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        invites: {
          decrement: 1,
        },
      },
    });

    return true;
  } catch (error) {
    console.error('Error inviting user.');

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return 'P2002';
      }
    }

    console.error(error);

    return false;
  } finally {
    revalidateTag(`user-${userId}`);
  }
}

export async function deleteInvite(email: string) {
  const userId = await getCurrUserId();

  try {
    const invite = await prisma.invite.delete({
      where: {
        userId_email: {
          userId: userId,
          email: email,
        },
        used: false,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        invites: {
          increment: 1,
        },
      },
    });

    return true;
  } catch (error) {
    console.error('Error deleting invite.');

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2015') {
        return 'P2015';
      }
    }

    console.error(error);

    return false;
  } finally {
    revalidateTag(`user-${userId}`);
  }
}
