import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { appStore } from '@/app/appStore';
import { appRouter } from '@/app/appRouter';

import '../styles/global.css';

const Root = () => (
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <RouterProvider router={appRouter()} />
    </ReduxProvider>
  </React.StrictMode>
);

export { Root };
