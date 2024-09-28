import { Button } from '@/shared/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type THeaderProps = object;

const Header: FC<THeaderProps> = () => {
  return (
    <header className="container flex justify-between items-center py-11 bg-gray-300">
      <Button asChild variant="link">
        <Link to="/">Logo</Link>
      </Button>

      <span>UA</span>
    </header>
  );
};

export { Header };
