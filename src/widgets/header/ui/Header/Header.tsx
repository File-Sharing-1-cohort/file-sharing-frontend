import { Button } from '@/shared/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import planet from './planet.svg';

type THeaderProps = object;

const Header: FC<THeaderProps> = () => {
  return (
    <header className="bg-header-footer-gradient shadow-header-custom px-11 py-7">
      <div className="flex justify-between items-center">
        <Button asChild variant="link">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Button>

        <div className="flex gap-4 items-center">
          <img src={planet} alt="planet" />
          <span>EN</span>
        </div>
      </div>
    </header>
  );
};

export { Header };
