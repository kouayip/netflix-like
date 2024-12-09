import React, { FC } from 'react';

import { cn } from '@/lib/utils';
import FavoriteIcon from '@/public/favorite.svg';
import FavoriteBorderIcon from '@/public/favorite_border.svg';

interface FavoriteButtonProps {
  isLiked?: boolean;
  className?: string;
  onToggle?: () => void;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ className, isLiked, onToggle }) => (
  <button
    className={cn(
      'absolute right-2 top-2 group/button',
      {
        'hidden group-hover:block': !isLiked,
      },
      className,
    )}
    onClick={(e) => {
      e.stopPropagation(); // Empêche le clic sur le bouton d'ouvrir la page du film
      onToggle?.();
    }}
  >
    {isLiked ? (
      <FavoriteIcon className="size-7 fill-red-500" />
    ) : (
      <FavoriteBorderIcon className="size-7 fill-slate-500 group-hover/button:fill-slate-700 transition-colors duration-300" />
    )}
  </button>
);

export default FavoriteButton;
