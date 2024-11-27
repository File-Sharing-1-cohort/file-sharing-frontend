import { RouteObject, createHashRouter as Router } from 'react-router-dom';

import { baseLayout } from '@/app/layout/baseLayout';
import { FaqPage } from '@/pages/faq';
import { DownloadFile } from '@/pages/recipient/';
import { SenderPage } from '@/pages/sender';
import { DownloadLink } from '@/pages/download-link';

const routes: RouteObject[] = [
  {
    element: baseLayout,
    path: '/',
    children: [
      {
        index: true,
        element: <SenderPage />,
      },
      {
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/download-link',
        element: <DownloadLink />,
      },
      {
        path: '/recipient/:fileId',
        element: <DownloadFile />,
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
