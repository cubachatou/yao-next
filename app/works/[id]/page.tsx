import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { WORK_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import WorkSwiper from './WorkSwiper';
import type { WorkWithImages, WorkImage, SanityImage } from '@/types';

const options = { next: { revalidate: 30 } };

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;
  const work = await client.fetch<WorkWithImages | null>(WORK_BY_SLUG_QUERY, { slug }, options);

  if (!work || !work.images) {
    return notFound();
  }

  const images: SanityImage[] = work.images
    .filter((img): img is WorkImage & { asset: NonNullable<WorkImage['asset']> } => img.asset !== null)
    .map(img => ({
      url: img.asset.url,
      width: img.asset.metadata?.dimensions?.width || 1200,
      height: img.asset.metadata?.dimensions?.height || 800,
      alt: img.alt,
    }));

  return (
    <div className="container absolute inset-0 pt-8">
      <WorkSwiper images={images} workTitle={work.title || 'Work'} />
    </div>
  );
}
