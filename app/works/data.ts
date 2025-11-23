// Import images for work-0
import work0_1 from '@/public/works/work-0/1.jpg';

// Import images for work-1
import work1_1 from '@/public/works/work-1/1.jpg';
import work1_2 from '@/public/works/work-1/2.jpg';
import work1_3 from '@/public/works/work-1/3.jpg';
import work1_4 from '@/public/works/work-1/4.jpg';
import work1_5 from '@/public/works/work-1/5.jpg';
import work1_6 from '@/public/works/work-1/6.jpg';

// Import images for work-2
import work2_1 from '@/public/works/work-2/1.jpg';
import work2_2 from '@/public/works/work-2/2.jpg';
import work2_3 from '@/public/works/work-2/3.jpg';
import work2_4 from '@/public/works/work-2/4.jpg';
import work2_5 from '@/public/works/work-2/5.jpg';
import work2_6 from '@/public/works/work-2/6.jpg';
import work2_7 from '@/public/works/work-2/7.jpg';
import work2_8 from '@/public/works/work-2/8.jpg';
import work2_9 from '@/public/works/work-2/9.jpg';
import work2_10 from '@/public/works/work-2/10.jpg';
import work2_11 from '@/public/works/work-2/11.jpg';
import work2_12 from '@/public/works/work-2/12.jpg';
import work2_13 from '@/public/works/work-2/13.jpg';
import work2_14 from '@/public/works/work-2/14.jpg';
import work2_15 from '@/public/works/work-2/15.jpg';

// Import images for work-3
import work3_1 from '@/public/works/work-3/1.jpg';
import work3_2 from '@/public/works/work-3/2.jpg';
import work3_3 from '@/public/works/work-3/3.jpg';
import work3_4 from '@/public/works/work-3/4.jpg';
import work3_5 from '@/public/works/work-3/5.jpg';
import work3_6 from '@/public/works/work-3/6.jpg';
import work3_7 from '@/public/works/work-3/7.jpg';

// Import images for work-4
import work4_1 from '@/public/works/work-4/1.jpg';
import work4_2 from '@/public/works/work-4/2.jpg';
import work4_3 from '@/public/works/work-4/3.jpg';
import work4_4 from '@/public/works/work-4/4.jpg';
import work4_5 from '@/public/works/work-4/5.jpg';
import work4_6 from '@/public/works/work-4/6.jpg';
import work4_7 from '@/public/works/work-4/7.jpg';

// Import images for work-5
import work5_1 from '@/public/works/work-5/1.jpg';
import work5_2 from '@/public/works/work-5/2.jpg';
import work5_3 from '@/public/works/work-5/3.jpg';
import work5_4 from '@/public/works/work-5/4.jpg';
import work5_5 from '@/public/works/work-5/5.jpg';
import work5_6 from '@/public/works/work-5/6.jpg';
import work5_7 from '@/public/works/work-5/7.jpg';
import work5_8 from '@/public/works/work-5/8.jpg';
import work5_9 from '@/public/works/work-5/9.jpg';
import work5_10 from '@/public/works/work-5/10.jpg';

// Import images for work-6
import work6_1 from '@/public/works/work-6/1.jpg';
import work6_2 from '@/public/works/work-6/2.jpg';

// Import images for work-7
import work7_1 from '@/public/works/work-7/1.jpg';
import work7_2 from '@/public/works/work-7/2.jpg';
import work7_3 from '@/public/works/work-7/3.jpg';
import work7_4 from '@/public/works/work-7/4.jpg';
import work7_5 from '@/public/works/work-7/5.jpg';
import work7_6 from '@/public/works/work-7/6.jpg';

// Import images for work-8
import work8_1 from '@/public/works/work-8/1.jpg';
import work8_2 from '@/public/works/work-8/2.jpg';
import work8_3 from '@/public/works/work-8/3.jpg';
import work8_4 from '@/public/works/work-8/4.jpg';

// Import images for work-9
import work9_1 from '@/public/works/work-9/1.jpg';
import work9_2 from '@/public/works/work-9/2.jpg';
import work9_3 from '@/public/works/work-9/3.jpg';
import work9_4 from '@/public/works/work-9/4.jpg';

// Import images for work-10
import work10_1 from '@/public/works/work-10/1.jpg';
import work10_2 from '@/public/works/work-10/2.jpg';
import work10_3 from '@/public/works/work-10/3.jpg';
import work10_4 from '@/public/works/work-10/4.jpg';
import work10_5 from '@/public/works/work-10/5.jpg';
import work10_6 from '@/public/works/work-10/6.jpg';
import work10_7 from '@/public/works/work-10/7.jpg';

import { StaticImageData } from 'next/image';

export interface Work {
  id: number;
  images: StaticImageData[];
}

export const worksData: Work[] = [
  {
    id: 0,
    images: [work0_1],
  },
  {
    id: 1,
    images: [work1_1, work1_2, work1_3, work1_4, work1_5, work1_6],
  },
  {
    id: 2,
    images: [
      work2_1,
      work2_2,
      work2_3,
      work2_4,
      work2_5,
      work2_6,
      work2_7,
      work2_8,
      work2_9,
      work2_10,
      work2_11,
      work2_12,
      work2_13,
      work2_14,
      work2_15,
    ],
  },
  {
    id: 3,
    images: [work3_1, work3_2, work3_3, work3_4, work3_5, work3_6, work3_7],
  },
  {
    id: 4,
    images: [work4_1, work4_2, work4_3, work4_4, work4_5, work4_6, work4_7],
  },
  {
    id: 5,
    images: [work5_1, work5_2, work5_3, work5_4, work5_5, work5_6, work5_7, work5_8, work5_9, work5_10],
  },
  {
    id: 6,
    images: [work6_1, work6_2],
  },
  {
    id: 7,
    images: [work7_1, work7_2, work7_3, work7_4, work7_5, work7_6],
  },
  {
    id: 8,
    images: [work8_1, work8_2, work8_3, work8_4],
  },
  {
    id: 9,
    images: [work9_1, work9_2, work9_3, work9_4],
  },
  {
    id: 10,
    images: [work10_1, work10_2, work10_3, work10_4, work10_5, work10_6, work10_7],
  },
];
