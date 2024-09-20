import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

type TLayoutProps = {
  header: ReactNode;
  footer: ReactNode;
};

const Layout: FC<TLayoutProps> = ({ header, footer }) => {
  return (
    <div className="text-center flex flex-col gap-3 pt-5 text-3xl">
      {header}
      <main>
        <Outlet />
      </main>
      {footer}
      <Toaster richColors expand position="bottom-center" />
    </div>
  );
};

export { Layout };
