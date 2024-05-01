'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Professor } from '@prisma/client';
import ProfessorCard from './ProfessorCard';

interface ProfessorWithAggs extends Professor {
  aveRating: number;
  aveDifficulty: number;
  tier: {
    tier: string;
    tierColor: string;
  };
  reviews: {
    rating: number;
    difficulty: number;
  }[];
  _count: {
    reviews: number;
  };
}

type Props = {
  professors: ProfessorWithAggs[] | null;
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
  if (professors === null) return null;

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
            <ProfessorCard
              prof={professor}
              totalReviews={professor._count.reviews}
            />
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default CourseProfessors;
