function getImageUrl(
  path?: string | null,
  size: string = process.env.TMDB_IMAGE_SIZE || "w500"
) {
  const baseUrl =
    process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";
  if (!path) {
    return "/placeholder.png";
  }
  return `${baseUrl}/${size}${path}`;
}

export { getImageUrl };
