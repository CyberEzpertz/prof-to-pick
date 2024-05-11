'use client';

import { ClassDetails } from '@/lib/types';
import React, { useEffect, useState } from 'react';

type Props = {};

const Scheduler = (props: Props) => {
  const [courseData, setCourseData] = useState<ClassDetails[] | null>(null);

  useEffect(() => {}, []);

  return <div>Scheduler</div>;
};

export default Scheduler;
