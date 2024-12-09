import '@testing-library/jest-dom';

import routerMock from 'next-router-mock';

jest.mock('next/router', () => ({
  useRouter: () => routerMock,
}));
