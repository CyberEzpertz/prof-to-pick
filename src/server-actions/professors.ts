'use server';

import prisma from '@/db/prisma/prisma';

export const fetchAllProfs = async () => {
  try {
    const professors = await prisma.professor.findMany();
    return professors;
  } catch (error) {
    console.error('Error fetching all professors');
    console.error(error);
    return undefined;
  }
};
