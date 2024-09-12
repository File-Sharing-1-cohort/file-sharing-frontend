declare global {
  type RootState = import('../src/app/appStore').RootState;
  type AppDispatch = import('../src/app/appStore').AppDispatch;
}

export {};
