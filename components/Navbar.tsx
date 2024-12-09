import React from 'react';

import Link from 'next/link';

import Container from './Container';

const Navbar = () => (
  <header className="bg-gray-900 text-white">
    <Container>
      <nav className="flex w-full justify-between items-center">
        <div className="text-xl font-bold">Netflix Like</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Films</Link>
          </li>
          <li>
            <Link href="/favorites">Mes Favoris</Link>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
);

export default Navbar;
