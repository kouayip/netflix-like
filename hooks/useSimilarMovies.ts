import { useQuery } from "@tanstack/react-query";

export const useSimilarMovies = (category: string | undefined) => {
  return useQuery({
    queryKey: ["similarMovies", category],
    // queryFn: () => fetchSimilarMovies(category!),
    enabled: !!category,
  });
};
