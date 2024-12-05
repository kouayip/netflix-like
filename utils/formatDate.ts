function formatReleaseYear(releaseDate: string) {
  if (!releaseDate || new Date(releaseDate).toString() === "Invalid Date") {
    return "N/A";
  }
  const date = new Date(releaseDate);
  const formattedYear = date.toLocaleString("en-GB", { year: "numeric" });

  return formattedYear;
}

export { formatReleaseYear };
