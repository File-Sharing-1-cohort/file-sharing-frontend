import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

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
    </div>
  );
};

export { Layout };
