import Image from 'next/image';
import TransitionLink from '../../components/TransitionLink';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { WORKS_QUERY } from '@/sanity/lib/queries';
import type { Work } from '@/types';

const options = { next: { revalidate: 30 } };

export default async function WorksPage() {
  const works = await client.fetch<Work[]>(WORKS_QUERY, {}, options);

  return (
    <main className="works">
      <div className="container">
        <ul className="grid 2xl:grid-cols-5 xl:grid-cols-4 grid-cols-3 2xl:gap-8 xl:gap-4 gap-2 pt-8">
          {works.map(work => {
            const image = work.firstImage;
            if (!image?.asset) return null;

            return (
              <li key={work._id} className="group">
                <TransitionLink href={`/works/${work.slug?.current}`}>
                  <figure className="relative overflow-hidden aspect-5/6">
                    <Image
                      src={urlFor(image).url()}
                      fill
                      sizes="(max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
                      loading="eager"
                      alt={image.alt || work.title || 'Work'}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </figure>
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
