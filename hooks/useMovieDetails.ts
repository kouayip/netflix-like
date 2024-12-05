import { useQuery } from "@tanstack/react-query";

export const useMovieDetails = (id: string | string[] | undefined) => {
  return useQuery({
    queryKey: ["movie", id],
    // queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });
};
