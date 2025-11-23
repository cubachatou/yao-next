import Link from 'next/link';
import Image from 'next/image';

import img1 from '@works/work-1/1.jpg';
import img2 from '@works/work-2/1.jpg';

const config = {
  slides: [
    { image: img1, title: 'Project 1', description: 'Description' },
    { image: img2, title: 'Project 2', description: 'Description' },
  ],
  planeSegments: 32,
  fov: 45,
  fovMobile: 60,
  mouseMultiplier: 0.5,
  mouseMultiplierMobile: 0.3,
  autoplayDuration: 5000,
  transitionDuration: 1.5,
};

export default function Home() {
  return (
    <div className="wrapper">
      <main className="slider-wrapper"></main>
    </div>
  );
}
