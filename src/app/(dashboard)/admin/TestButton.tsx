'use client';
import { Button } from '@/components/ui/button';
import { generateSchedules } from '@/server-actions/classes';
import React from 'react';

type Props = {};

const TestButton = (props: Props) => {
  return (
    <Button onClick={async () => await generateSchedules()}>Generate</Button>
  );
};

export default TestButton;
