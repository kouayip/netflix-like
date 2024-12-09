import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReleaseYear(releaseDate: string) {
  if (!releaseDate || new Date(releaseDate).toString() === 'Invalid Date') {
    return 'N/A';
  }
  const date = new Date(releaseDate);
  const formattedYear = date.toLocaleString('en-GB', { year: 'numeric' });

  return formattedYear;
}

export function formatMoney(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function getImageUrl(
  path?: string | null,
  size: string = process.env.TMDB_IMAGE_SIZE || 'w500',
) {
  const baseUrl = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  if (!path) {
    return '/placeholder.png';
  }
  return `${baseUrl}/${size}${path}`;
}
