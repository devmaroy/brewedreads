export interface Genre {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  coverImageWidth: number;
  coverImageHeight: number;
}
