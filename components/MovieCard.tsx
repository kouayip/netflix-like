'use client';

import React, { forwardRef, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getImageUrl } from '@/lib/utils';
import { useFavorites } from '@/store/useFavorites';
import { Movie } from '@/types/movie';

import FavoriteButton from './FavoriteButton';

type MovieCardProps = Movie & {};

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ id, title, name, poster_path }, ref) => {
    const { toggleFavorite, isHydrated, isFavorite } = useFavorites();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
      if (isHydrated) {
        setFavorite(isFavorite(id));
      }
    }, [isHydrated, isFavorite, id]);

    const handleToggleFavorite = () => {
      toggleFavorite({ id, title, poster_path });
      setFavorite(!favorite); // Met à jour immédiatement l'état local
    };

    return (
      <div
        className="flex flex-col flex-1 max-w-72 rounded-lg shadow-black/5 shadow-none cursor-pointer group"
        ref={ref}
      >
        <Link className="inline-flex size-full flex-col" href={`/movie/${id}`}>
          {/* Image Section */}
          <div className="relative size-full overflow-hidden rounded-lg">
            <Image
              src={getImageUrl(poster_path)}
              alt={title || name}
              className="object-cover h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder.png"
              width={288}
              height={432}
            />
            {/* Favorite Button */}
            <FavoriteButton isLiked={favorite} onToggle={handleToggleFavorite} />
          </div>
          {/* Text Section */}
          <h3 className="mt-2 text-white text-sm leading-[1.125rem] font-normal shadow-text">
            {title || name}
          </h3>
        </Link>
      </div>
    );
  },
);

MovieCard.displayName = 'MovieCard';
export default MovieCard;
