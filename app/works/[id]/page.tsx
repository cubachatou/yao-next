'use client';
import { useParams } from 'next/navigation';
import { worksData } from '../data';
import WorkSwiper from './WorkSwiper';

export default function WorkPage() {
  const params = useParams();
  const workId = parseInt(params.id as string);
  const work = worksData.find(w => w.id === workId);

  if (!work) {
    return (
      <div className="absolute inset-0 size-full flex items-center justify-center">
        <p>Work not found</p>
      </div>
    );
  }

  return (
    <div className="container h-[calc(100svh-8rem)] pt-8">
      <WorkSwiper images={work.images} workId={workId} />
    </div>
  );
}
