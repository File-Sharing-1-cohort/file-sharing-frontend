import { RouteObject, createHashRouter as Router } from 'react-router-dom';

import { HomePage } from '@/pages/home';

import { baseLayout } from '@/app/layout/baseLayout';
import { FaqPage } from '@/pages/faq';

const routes: RouteObject[] = [
  {
    element: baseLayout,
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '*',
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
];

const appRouter = () => Router(routes);

export { appRouter };
