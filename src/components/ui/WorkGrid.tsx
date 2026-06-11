import React from 'react';
import { Work } from '@/pages/Works'; // type import
import { WorkCard } from '@/components/ui/WorkCard';

interface WorkGridProps {
  works: Work[];
  onOpen: (work: Work) => void;
}

export function WorkGrid({ works, onOpen }: WorkGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} onOpen={onOpen} />
      ))}
    </div>
  );
}
