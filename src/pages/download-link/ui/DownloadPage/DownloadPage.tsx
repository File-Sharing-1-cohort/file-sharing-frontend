import { useFileContext } from '@/app/FileContext';
import { Input } from '@/shared/ui';
import copy from '@/shared/ui/icons/copy.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import folder from '@/shared/ui/icons/folder.svg';
import success from '@/shared/ui/icons/alert-success.svg';

const DownloadLink = () => {
  const { fileId } = useFileContext();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fileId) {
      toast.error('No file ID available, redirecting...');
      navigate('/');
      return;
    }

    const recipientLink = `${window.location.origin}/#/recipient/${fileId}`;
    setFileUrl(recipientLink);
  }, [fileId, navigate]);

  const handleCopyClick = () => {
    if (fileUrl) {
      navigator.clipboard
        .writeText(fileUrl)
        .then(() => {
          toast.custom(
            () => (
              <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-success border rounded-lg shadow-lg">
                <div className="flex start gap-2">
                  <img src={success} alt="success" />
                  <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                    Link copied
                  </h4>
                </div>
                <div className="px-3 mt-2 text-customBlack">
                  Your link was successfully copied. Now you can share your
                  file. The link is available for 24 hours{' '}
                </div>
                <div className="flex end gap-6  mt-4 space-x-2">
                  <button
                    onClick={() => {
                      toast.dismiss();
                    }}
                    className="px-4 py-2 text-[20px] font-[400] text-white bg-customGreen rounded"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ),
            {
              duration: 3000,
              position: 'top-center',
              className: `
                  fixed left-1/2 transform -translate-x-1/2
                `,
            },
          );
        })
        .catch(() => toast.error('Failed to copy link.'));
    } else {
      toast.error('No link available to copy.');
    }
  };

  return (
    <section className="flex flex-col gap-4 items-center w-screen p-10">
      <div>
        <span className="px-72">Link</span>
        <div className="flex gap-4 items-center w-screen px-72">
          <Input
            value={fileUrl || ''}
            className="w-full border-[#116ACC]"
            readOnly
          />
          <img
            className="cursor-pointer"
            src={copy}
            alt="Copy"
            onClick={handleCopyClick}
          />
        </div>
      </div>

      <img className="end" src={folder} alt="folder" />

      <div className="mt-20 px-20 end">
        <button
          className="gradient-border btn-home hover:opacity-70"
          onClick={() => navigate('/')}
        >
          To home page
        </button>
      </div>
    </section>
  );
};

export { DownloadLink };
