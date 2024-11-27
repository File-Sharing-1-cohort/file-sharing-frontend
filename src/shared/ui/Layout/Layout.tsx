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
      <Toaster richColors expand position="top-center" />
    </div>
  );
};

export { Layout };
