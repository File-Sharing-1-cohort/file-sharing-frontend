import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

type TLayoutProps = {
  header: ReactNode;
  footer: ReactNode;
};

const Layout: FC<TLayoutProps> = ({ header, footer }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {header}
      <main className="flex-grow">
        <Outlet />
      </main>
      {footer}
      <Toaster richColors expand position="bottom-center" />
      <Toaster expand position="bottom-left" />
      <Toaster richColors position="top-center" />
      <Toaster richColors expand position="bottom-right" />
      <Toaster richColors expand position="top-left" />
      <Toaster richColors expand position="top-right" />
    </div>
  );
};

export { Layout };
