export interface User {
  id: string;
  name: string;
  email?: string | null;
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
  reviews?: Review[];
  pageCount?: number;
  publishedDate?: Date;
  publisher?: string;
}

export interface Review {
  rating: {
    id: string;
    score: number;
    bookId: string;
    userId: string;
    reviewId: string | null;
  } | null;
  user: {
    id: string;
    name: string;
    slug: string;
    email: string | null;
    emailVerified: Date | null;
    avatar: string | null;
    roleId: string | null;
  };
  id: string;
  createdDate: Date;
  content: string;
}

export interface SingleBook {
  cover?: {
    width?: number;
    height?: number;
    url: string;
  };
  genres?: Genre[];
  title: string;
  rating: number;
  author?: {
    id: string;
    slug: string;
    name: string;
  };
  teaser?: string;
  description?: string;
  pageCount?: number;
  publishedDate?: Date;
  publisher?: string;
  reviews?: Review[];
  reviewsNextCursor?: string;
}

export interface BookPage {
  books: Book[];
  nextCursor: string | undefined;
}

export interface ReviewPage {
  reviews: Review[];
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
