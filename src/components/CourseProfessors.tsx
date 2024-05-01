'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ProfessorCard from './ProfessorCard';
import { useSearchParams } from 'next/navigation';
import { ProfWithReviewCount } from '@/lib/types';
import { cn } from '@/lib/utils';

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

const TierBox = ({
  profs,
  tier,
}: {
  profs: ProfWithReviewCount[];
  tier: 'W' | 'M' | 'L' | 'Unknown';
}) => {
  return (
    <motion.li
      variants={item}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      className="m-8 mt-0 flex flex-col gap-2"
    >
      <h1 className="text-3xl font-bold">
        {tier} {tier !== 'Unknown' && 'Tier'}
      </h1>
      <div className="relative">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className={cn(
            'flex flex-row flex-wrap items-start gap-x-8 gap-y-4 rounded-xl border border-slate-800 p-6 pl-12',
            "before:absolute before:left-0 before:top-0 before:-mr-10 before:h-full before:w-6 before:rounded-l-xl before:content-['']",
            tier === 'W'
              ? 'before:bg-teal-500'
              : tier === 'M'
                ? 'before:bg-purple-500'
                : tier === 'L'
                  ? 'before:bg-rose-500'
                  : 'before:bg-slate-600',
          )}
        >
          {profs.length !== 0 ? (
            profs.map((professor) => {
              return (
                <motion.li
                  key={professor.id}
                  variants={item}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                >
                  <ProfessorCard prof={professor} noTier />
                </motion.li>
              );
            })
          ) : (
            <p className="text-sm italic text-slate-500">
              No professors for this tier...
            </p>
          )}
        </motion.ul>
      </div>
    </motion.li>
  );
};

const CourseProfessors = ({ professors }: Props) => {
  const searchParams = useSearchParams();

  if (searchParams.get('group') === 'true') {
    const tiers = professors.reduce<Record<string, ProfWithReviewCount[]>>(
      (acc, curr) => {
        if (curr.avgRating === null) acc.U.push(curr);
        else if (curr.avgRating >= 3.67) acc.W.push(curr);
        else if (curr.avgRating >= 2.33) acc.M.push(curr);
        else acc.L.push(curr);

        return acc;
      },
      { W: [], M: [], L: [], U: [] },
    );

    return (
      <motion.ul variants={container} initial="hidden" animate="show">
        <TierBox profs={tiers.W} tier="W" />
        <TierBox profs={tiers.M} tier="M" />
        <TierBox profs={tiers.L} tier="L" />
        <TierBox profs={tiers.U} tier="Unknown" />
      </motion.ul>
    );
  }

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
