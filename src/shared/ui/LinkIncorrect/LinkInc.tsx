import linkInc from '@/shared/ui/icons/inc-link.svg';
import { useNavigate } from 'react-router-dom';

const LinkInc = ({
  title = 'This link is incorrect',
  description = 'Please, contact sender to address the issue',
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-20">
      <div>
        <img src={linkInc} alt="folderDownload" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h4 className="font-libre text-customGray text-[32px] font-[500]">
          {title}
        </h4>
        <p className="font-libre text-customGray text-[20px] font-[500]">
          {description}
        </p>
      </div>
      <button
        className="gradient-border btn-home hover:opacity-70"
        onClick={() => navigate('/')}
      >
        To home page
      </button>
    </div>
  );
};

export { LinkInc };
