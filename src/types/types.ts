export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  averageRating: number | null;
}
