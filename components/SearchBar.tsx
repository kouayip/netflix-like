'use client';
import React, { useRef } from 'react';
import { FC, useState, useEffect } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { useDebounce } from '@/hooks/useDebounce';

export function createUrl(pathname: string, searchParams?: URLSearchParams) {
  const searchParamsString = searchParams?.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : '';
  return `${pathname}${queryString}`;
}

const SearchBar: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(initialQuery);

  const debouncedValue = useDebounce(searchValue, 300);

  // Mettre à jour l'URL uniquement lorsque debouncedValue change
  useEffect(() => {
    if (debouncedValue === initialQuery) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (debouncedValue.trim()) {
      newSearchParams.set('query', debouncedValue.trim());
    } else {
      newSearchParams.delete('query');
    }

    router.replace(createUrl(pathname, newSearchParams));
  }, [debouncedValue, pathname, router, searchParams, initialQuery]);

  useEffect(() => {
    // Désactiver autoFocus après le premier rendu
    if (inputRef.current) inputRef.current.blur();
  }, []);

  return (
    <input
      ref={inputRef}
      type="search"
      placeholder="Rechercher un film..."
      className="p-2 w-full border rounded mt-4"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)} // Contrôler localement la valeur
    />
  );
};

export default SearchBar;
