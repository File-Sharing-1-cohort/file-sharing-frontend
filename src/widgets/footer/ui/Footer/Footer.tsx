import { Button } from '@/shared/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type TFooterProps = object;

const Footer: FC<TFooterProps> = () => {
  return (
    <footer className="bg-gray-300">
      <div className="container flex justify-between items-center py-11">
        <Button asChild variant="link">
          <Link to="/faq">FAQ</Link>
        </Button>

        <span>Copywright&copy; 2024 File Sharing</span>

        <Button asChild variant="link">
          <Link to="/">Logo</Link>
        </Button>
      </div>
    </footer>
  );
};

export { Footer };
