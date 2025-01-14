import { Button } from '@/shared/ui';
import React, { FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';

type TFooterProps = object;

const Footer: FC<TFooterProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    if (location.pathname === '/faq') {
      e.preventDefault();
      navigate('/');
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.location.reload();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <footer className="bg-header-footer-gradient shadow-custom px-11 py-9">
      <div className="flex justify-between items-center">
        <Button asChild variant="link">
          <Link to="/faq" onClick={handleClick}>
            <span className="font-mallana text-customFaq text-[20px]">FAQ</span>
          </Link>
        </Button>

        <Button asChild variant="link">
          <Link to="/" onClick={handleLogoClick}>
            <img src={logo} alt="logo" />
          </Link>
        </Button>
      </div>
      <div className="font-mallana text-center mt-10">
        Copyright &copy; 2024 - File Sharing
      </div>
    </footer>
  );
};

export { Footer };
