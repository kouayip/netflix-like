"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/getImageUrl";

type MovieCardProps = Movie & {
  isFavorite: boolean;
};

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ id, title, name, poster_path, isFavorite }, ref) => {
    const router = useRouter();

    const pageHandler = () => {
      router.push(`/movie/${id}`);
    };

    return (
      <div
        className="flex flex-col w-full max-w-72 rounded-lg shadow-black/5 shadow-none cursor-pointer group"
        ref={ref}
        onClick={pageHandler}
      >
        {/* Image Section */}
        <div className="relative flex-1 w-full overflow-hidden rounded-lg">
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
        </div>

        {/* Text Section */}
        <h3 className="mt-2 text-white text-sm leading-[1.125rem] font-normal shadow-text">
          {title || name}
        </h3>

        {/* Favorite Button */}
        <button
          className={`mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
            isFavorite
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Empêche le clic sur le bouton d'ouvrir la page du film
            // Ajouter ou supprimer des favoris (logique à ajouter ici)
          }}
        >
          {isFavorite ? "Supprimer des Favoris" : "Ajouter aux Favoris"}
        </button>
      </div>
    );
  }
);

export default MovieCard;
