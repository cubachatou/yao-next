// Sanity asset types
export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface WorkImage {
  asset: SanityImageAsset | null;
  alt?: string;
}

// Work types for list view
export interface Work {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  firstImage: WorkImage | null;
}

// Work types for single work view
export interface WorkWithImages extends Omit<Work, 'firstImage'> {
  images: WorkImage[] | null;
}

// Simplified image type for components
export interface SanityImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}
