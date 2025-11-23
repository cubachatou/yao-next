import Link from 'next/link';
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
const works = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function WorksPage() {
  return (
    <main className="works">
      <div className="container">
        <ul className="grid 2xl:grid-cols-5 xl:grid-cols-4 grid-cols-3 2xl:gap-8 xl:gap-4 gap-2">
          {works.map((img, index) => (
            <li key={index} className="group">
              <Link href={`/works/${index + 1}`}>
                <figure className="relative overflow-hidden h-full">
                  <Image
                    src={img.src}
                    width={1000}
                    height={1000}
                    alt={`Work ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
