import { worksData } from '../data';
import { getImagesWithBlur } from '@/lib/plaiceholder';
import WorkSwiper from './WorkSwiper';

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workId = parseInt(id);
  const work = worksData.find((w) => w.id === workId);

  if (!work) {
    return (
      <div className="absolute inset-0 size-full flex items-center justify-center">
        <p>Work not found</p>
      </div>
    );
  }

  const imagesWithBlur = await getImagesWithBlur(work.images);

  return (
    <div className="container h-[calc(100svh-8rem)] pt-8">
      <WorkSwiper images={imagesWithBlur} workId={workId} />
    </div>
  );
}
