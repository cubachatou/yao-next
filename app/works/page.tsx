import Image from 'next/image';

import img1 from '@works/work-1/1.jpg';
import img2 from '@works/work-2/1.jpg';
import img3 from '@works/work-3/1.jpg';
import img4 from '@works/work-4/1.jpg';
import img5 from '@works/work-5/1.jpg';
import img6 from '@works/work-6/1.jpg';
import img7 from '@works/work-7/1.jpg';
import img8 from '@works/work-8/1.jpg';
import img9 from '@works/work-9/1.jpg';
import img10 from '@works/work-10/1.jpg';
import img11 from '@works/work-11/1.jpg';
import img12 from '@works/work-12/1.jpeg';
import TransitionLink from '../../components/TransitionLink';
const works = [
  { src: img1, path: '/works/work-1/1.jpg' },
  { src: img2, path: '/works/work-2/1.jpg' },
  { src: img3, path: '/works/work-3/1.jpg' },
  { src: img4, path: '/works/work-4/1.jpg' },
  { src: img5, path: '/works/work-5/1.jpg' },
  { src: img6, path: '/works/work-6/1.jpg' },
  { src: img7, path: '/works/work-7/1.jpg' },
  { src: img8, path: '/works/work-8/1.jpg' },
  { src: img9, path: '/works/work-9/1.jpg' },
  { src: img10, path: '/works/work-10/1.jpg' },
  { src: img11, path: '/works/work-11/1.jpg' },
  { src: img12, path: '/works/work-12/1.jpeg' },
];




import { getImagesWithBlur } from '@/lib/plaiceholder';

export default async function WorksPage() {
  const worksWithBlur = await getImagesWithBlur(works);

  return (
    <main className="works">
      <div className="container">
        <ul className="grid 2xl:grid-cols-5 xl:grid-cols-4 grid-cols-3 2xl:gap-8 xl:gap-4 gap-2">
          {worksWithBlur.map((img, index) => (
            <li key={index} className="group">
              <TransitionLink href={`/works/${index + 1}`}>
                <figure className="relative overflow-hidden h-full">
                  <Image
                    src={img.src}
                    width={1000}
                    height={1000}
                    alt={`Work ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                  />
                </figure>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
