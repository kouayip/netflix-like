import React, { Suspense } from 'react';

import { Metadata } from 'next';
import Image from 'next/image';

import Container from '@/components/Container';
import SimilarMovies from '@/components/SimilarMovies';
import { getMetadata } from '@/lib/seo';
import { fetchMovieDetails, fetchSimilarMovies } from '@/lib/tmdb';
import { formatMoney, formatReleaseYear, getImageUrl } from '@/lib/utils';
import { PageProps } from '@/.next/types/app/layout';

type MovieDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { title, poster_path, overview } = await fetchMovieDetails(String(id));

  return getMetadata({
    title: title,
    description: overview,
    pathname: `/movie/${id}`,
    images: [
      {
        url: getImageUrl(poster_path),
        width: 500,
        height: 750,
        alt: title,
      },
    ],
  });
}

const MovieDetails = async ({ params }: MovieDetailsProps) => {
  const { id } = await params;

  const [
    { title, poster_path, backdrop_path, release_date, overview, budget, revenue },
    initialSimilarMovies,
  ] = await Promise.all([fetchMovieDetails(String(id)), fetchSimilarMovies(id, 1)]);

  return (
    <div className="relative flex flex-1 flex-col">
      {/* Hero Section */}
      <div className="relative w-full bg-black overflow-hidden">
        {/* Background Image */}
        <div className="overflow-hidden">
          <div className="absolute inset-0 animate-cinematic">
            <Image
              src={getImageUrl(backdrop_path, 'w1280')}
              alt={title}
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        {/* Hero Content */}
        <div className="w-full max-w-screen-2xl m-auto relative inset-0 z-10 flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-start px-8 py-12">
          {/* Poster */}
          <Image
            src={getImageUrl(poster_path)}
            alt={`${title} Poster`}
            className="object-cover"
            priority
            width={300}
            height={450}
          />

          {/* Text Content */}
          <div className="text-white max-w-4xl space-y-4 lg:ml-8 mt-4 lg:mt-0">
            <h1 className="text-4xl lg:text-6xl font-bold">{title}</h1>
            <p className="text-lg opacity-80">{overview}</p>
            <div className="flex gap-8 items-center mt-4">
              {budget > 0 && (
                <div>
                  <span className="font-semibold">Budget: </span>
                  <span>${formatMoney(budget)}</span>
                </div>
              )}
              {revenue > 0 && (
                <div>
                  <span className="font-semibold">Revenue: </span>
                  <span>${formatMoney(revenue)}</span>
                </div>
              )}
              <div>
                <span className="font-semibold">Année: </span>
                <span>{formatReleaseYear(release_date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Films similaires */}
      <Container>
        <div className="pt-6 lg:pt-12 w-full">
          <h2 className="text-2xl font-bold mb-6 text-white">Films similaires</h2>
          <Suspense fallback={<p className="text-white">Chargement des films similaires...</p>}>
            <SimilarMovies movieId={id} initialMovies={initialSimilarMovies} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetails;
