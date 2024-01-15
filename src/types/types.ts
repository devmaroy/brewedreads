export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string | null;
}

export interface Filter {
  label: string;
  value: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  teaser?: string;
  author?: {
    id: string;
    name: string;
    slug: string;
  };
  description?: string;
  coverImageUrl: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  averageRating: number | null;
  genres?: Genre[];
}

export interface BookReview {
  id: string;
  createdDate: Date;
  content: string;
  user: User;
  rating: { id: string; score: number } | null;
}

export interface SingleBook {
  cover: {
    width: number;
    height: number;
    url: string;
  };
  genres: Genre[];
  title: string;
  rating: number;
  author: {
    id: string;
    slug: string;
    name: string;
  };
  teaser: string;
  description: string;
  pageCount: number;
  publishedDate: Date;
  publisher: string;
  reviews?: BookReview[];
}

export interface BookPage {
  books: Book[];
  nextCursor: string | undefined;
}

export type SortKey =
  | ""
  | "title_asc"
  | "title_desc"
  | "publishedDate_asc"
  | "publishedDate_desc"
  | "pageCount_asc"
  | "pageCount_desc"
  | "averageRating_asc"
  | "averageRating_desc";

export type SortFieldName =
  | "title"
  | "publishedDate"
  | "pageCount"
  | "averageRating";

export interface SortOption {
  input?: SortKey;
  fieldName: SortFieldName;
  order: "asc" | "desc";
}
