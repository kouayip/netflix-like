"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";

interface SearchBarProps {
  autoFocus?: boolean;
}

export function createUrl(pathname: string, searchParams?: URLSearchParams) {
  const searchParamsString = searchParams?.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : "";
  return `${pathname}${queryString}`;
}

const SearchBar: FC<SearchBarProps> = ({ autoFocus }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);
  const [shouldAutoFocus, setShouldAutoFocus] = useState(autoFocus);

  const debouncedValue = useDebounce(searchValue, 300);

  // Désactiver autoFocus après le premier rendu
  useEffect(() => {
    setShouldAutoFocus(false);
  }, []);

  // Mettre à jour l'URL uniquement lorsque debouncedValue change
  useEffect(() => {
    if (debouncedValue === initialQuery) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (debouncedValue.trim()) {
      newSearchParams.set("query", debouncedValue.trim());
    } else {
      newSearchParams.delete("query");
    }

    router.replace(createUrl(pathname, newSearchParams));
  }, [debouncedValue, pathname, router, searchParams, initialQuery]);

  return (
    <input
      type="search"
      placeholder="Rechercher un film..."
      className="p-2 w-full border rounded mt-4"
      value={searchValue}
      autoFocus={shouldAutoFocus} // Utiliser l'état local pour autoFocus
      onChange={(e) => setSearchValue(e.target.value)} // Contrôler localement la valeur
    />
  );
};

export default SearchBar;
