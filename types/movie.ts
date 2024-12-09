export interface Movie {
  id: number;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  poster_path?: string;
  image?: string;
  vote_average?: number;
  type: "movie" | "tv";
}

export interface MovieAPIResponse {
  page: number;
  type: string;
  limit: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export type MovieDetail = {
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
