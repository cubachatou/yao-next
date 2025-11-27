import { defineQuery } from 'next-sanity';

export const WORKS_QUERY = defineQuery(`
  *[_type == "work"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "firstImage": images[0]{
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    }
  }
`);

export const WORK_BY_SLUG_QUERY = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    images[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    }
  }
`);
