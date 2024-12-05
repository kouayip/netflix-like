"use server";

import axios from "axios";
import { MovieAPIResponse, MovieDetail } from "@/types/movie";

// Base URL et clé API
const api = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "fr-FR", // Changez la langue si besoin
  },
});

// Récupérer les films populaires
export const getMovies = async (category: string, page: number) => {
  const response = await api.get<MovieAPIResponse>(`/movie/${category}`, {
    params: {
      page: page.toString(),
    },
  });
  return response.data;
};

// Récupérer les films populaires
export const getPopularMovies = async (page: number) => {
  const response = await api.get("/movie/popular", {
    params: {
      page: page.toString(),
    },
  });
  return response.data.results;
};

// Récupérer les détails d'un film
export const fetchMovieDetails = async (id: string) => {
  const response = await api.get<MovieDetail>(`/movie/${id}`);
  return response.data;
};

// Récupérer les films similaires
export const fetchSimilarMovies = async (id: string, page: number) => {
  const response = await api.get<MovieAPIResponse>(`/movie/${id}/similar`, {
    params: {
      page: page.toString(),
    },
  });
  return response.data;
};

// Rechercher un film
export const searchMovies = async (query: string, page: number) => {
  const response = await api.get<MovieAPIResponse>("/search/movie", {
    params: { query, page: page.toString() },
  });
  return response.data;
};
