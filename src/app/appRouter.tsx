import { RouteObject, createHashRouter as Router } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { Faq } from '@/pages/faq';

import { baseLayout } from '@/app/layout/baseLayout';

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
        element: <Faq />,
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
