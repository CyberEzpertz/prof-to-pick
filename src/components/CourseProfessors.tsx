'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ProfessorCard from './ProfessorCard';
import { useSearchParams } from 'next/navigation';
import { ProfWithReviewCount } from '@/lib/types';

type Props = {
  professors: ProfWithReviewCount[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const CourseProfessors = ({ professors }: Props) => {
  const searchParams = useSearchParams();

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-row flex-wrap items-start justify-center gap-8 p-8 pt-0"
    >
      {professors.map((professor) => {
        return (
          <motion.li
            key={professor.id}
            variants={item}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          >
            <ProfessorCard prof={professor} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default CourseProfessors;
