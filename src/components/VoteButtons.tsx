import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react';

type Props = {};

const VoteButtons = (props: Props) => {
  return (
    <>
      <div>
        <ThumbsUp
          strokeWidth={1}
          className="mr-2 inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
        <ThumbsDown
          strokeWidth={1}
          className="mr-4 inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
      </div>
      XX people found this helpful.
    </>
  );
};

export default VoteButtons;
