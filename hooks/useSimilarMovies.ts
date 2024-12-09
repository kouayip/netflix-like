import { useQuery } from '@tanstack/react-query';

export const useSimilarMovies = (category: string | undefined) =>
  useQuery({
    queryKey: ['similarMovies', category],
    // queryFn: () => fetchSimilarMovies(category!),
    enabled: !!category,
  });
