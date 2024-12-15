import { Button } from '@/shared/ui';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

type TFooterProps = object;

const Footer: FC<TFooterProps> = () => {
  return (
    <footer className="bg-header-footer-gradient shadow-custom px-11 py-9">
      <div className="flex justify-between items-center">
        <Button asChild variant="link">
          <Link to="/faq">
            <span className="font-mallana text-customFaq text-[20px]">FAQ</span>
          </Link>
        </Button>

        <Button asChild variant="link">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Button>
      </div>
      <div className="font-mallana text-center mt-10">Copyright &copy; 2024 - File Sharing</div>
    </footer>
  );
};

export { Footer };
