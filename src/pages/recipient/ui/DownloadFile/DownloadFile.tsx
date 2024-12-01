import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/ui';
import { Progress } from '@/shared/ui';
import { FolderDownload } from '@/shared/ui/LoadingComponent';
import download from '@/shared/ui/icons/download-img.svg';
import compress from '@/shared/ui/icons/compress-img.svg';
import share from '@/shared/ui/icons/share-img.svg';
import eye from '@/shared/ui/icons/eye-open.svg';
import eyeClosed from '@/shared/ui/icons/eye-close.svg';
import lock from '@/shared/ui/icons/lock.svg';
import btnDownload from '@/shared/ui/icons/download-icon.svg';
import success from '@/shared/ui/icons/alert-success.svg';
import errorIcon from '@/shared/ui/icons/error.svg';

const DownloadFile = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [metadata, setMetadata] = useState<{
    originalFileName: string;
    fileSize: string;
    loadedAt: string;
    expirationHours: number;
  } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFileMetadata = async (password?: string) => {
    try {
      const url = password
        ? `${import.meta.env.VITE_BASE_API_URL}files/metadata/${fileId}?password=${encodeURIComponent(password)}`
        : `${import.meta.env.VITE_BASE_API_URL}files/metadata/${fileId}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log('Meta:', data);
        setMetadata(data);
        setIsModalOpen(false);
      } else if (response.status === 400) {
        setIsModalOpen(true);
        const errorText = await response.text();
        console.log('Error response:', errorText);
        if (errorText.includes('Incorrect password')) {
          setErrorMessage('Incorrect password, please try again.');
        }
      } else {
        throw new Error('Failed to fetch file metadata.');
      }
    } catch (error) {
      console.error('Metadata fetch error:', error);
      toast.error('Could not load file metadata.');
    }
  };

  const bytesToMegabytes = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsSelected(checked);
    setSelectedCount(checked ? selectedCount + 1 : selectedCount - 1);
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return date.toLocaleDateString('en-GB', options);
  };

  const expirationTime = (loadedAt: string, expirationHours: number) => {
    const loadedDate = new Date(loadedAt);
    loadedDate.setHours(loadedDate.getHours() + expirationHours);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return loadedDate.toLocaleDateString('en-GB', options);
  };

  const downloadFile = async () => {
    setIsLoading(true);
    if (!metadata?.fileSize) {
      toast.error('File size information is missing.');
      return;
    }

    const totalSize = parseInt(metadata.fileSize, 10);
    let loaded = 0;

    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}files/${fileId}?password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/octet-stream',
        },
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported.');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          loaded += value.length;
          chunks.push(value);
          setDownloadProgress(Math.round((loaded / totalSize) * 100));
        }
      }

      const blob = new Blob(chunks);
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = metadata.originalFileName || 'downloaded-file';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);

      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-success border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={success} alt="success" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                File downloaded successfully
              </h4>
            </div>
            <div className="px-3 start mt-2 text-customBlack">
              You have successfully downloaded files
            </div>
            <div className="flex end gap-6  mt-4 space-x-2">
              <button
                onClick={() => {
                  toast.dismiss();
                }}
                className="px-4 py-2 border border-customGreen text-customGray bg-transparent rounded"
              >
                Exit
              </button>
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
      setIsLoading(false);
    } catch (error) {
      console.error('Download error:', error);
      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={errorIcon} alt="error" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                Something went wrong
              </h4>
            </div>
            <div className="px-3 mt-2 text-customBlack">
              An unknown error occurred while downloading the file
            </div>
            <div className="flex end gap-6  mt-4 space-x-2">
              <button
                onClick={() => {
                  toast.dismiss();
                }}
                className="px-4 py-2 text-[20px] border border-customRed text-customGray font-[400] bg-transparent rounded"
              >
                Exit
              </button>
              <button
                onClick={() => {
                  toast.dismiss();
                }}
                className="px-4 py-2 text-[20px] font-[400] text-white bg-customRed rounded"
              >
                Try again
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
    }
  };

  const handlePasswordSubmit = async () => {
    if (password) {
      if (!metadata) {
        await fetchFileMetadata(password);
      } else {
        downloadFile();
      }
    } else {
      setErrorMessage('Please enter a password.');
    }
  };

  useEffect(() => {
    if (!fileId) {
      toast.error('Invalid or missing file ID.');
      navigate('/');
      return;
    }

    fetchFileMetadata();
  }, [fileId, navigate]);

  return (
    <section className="flex flex-col gap-4 items-center w-screen p-10">
      {isLoading ? (
        <>
          {downloadProgress > 0 && <Progress value={downloadProgress} />}
          <FolderDownload />
        </>
      ) : (
        metadata && (
          <div className="flex flex-col items-center gap-6 w-full p-6">
            <h1 className="text-2xl font-bold">
              Document package from{' '}
              {metadata?.loadedAt ? formatDate(metadata.loadedAt) : 'N/A'}
            </h1>

            {metadata?.loadedAt && metadata?.expirationHours && (
              <p className="text-lg text-customRed">
                available till:{' '}
                {expirationTime(metadata.loadedAt, metadata.expirationHours)}
              </p>
            )}

            <div className="grid grid-cols-3 gap-4 items-center justify-items-center w-full max-w-lg">
              <div className="font-bold">File Name</div>
              <div className="font-bold">Size (MB)</div>
              <div className="font-bold">Selected ({isSelected ? 1 : 0})</div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleCheckboxChange}
                />
                <span>{metadata.originalFileName}</span>
              </div>
              <div>{bytesToMegabytes(Number(metadata.fileSize))} MB</div>
              <div
                onClick={downloadFile}
                className={`flex gap-2 border-b-2 border-customLightBlue ${
                  !isSelected ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <button className="text-customLightBlue" disabled={!isSelected}>
                  Download
                </button>
                <img src={btnDownload} alt="btnDownload" />
              </div>
            </div>
          </div>
        )
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center gap-10 gradient-modal p-6 rounded-lg shadow-lg w-[620px]">
            <div className="flex justify-center gap-2">
              <img src={lock} alt="lock" />
              <h2 className="text-[20px] font-[500] text-white">
                Insert password
              </h2>
            </div>
            <div className="w-full px-20">
              <span className="text-white">Password</span>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className={`pr-10 ${errorMessage ? 'bg-[#FE51514D]' : ''}`}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <img
                  onClick={() => setShowPassword(prev => !prev)}
                  src={showPassword ? eye : eyeClosed}
                  alt="Toggle visibility"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
              {errorMessage ? (
                <span className="text-[14px] text-red-500">{errorMessage}</span>
              ) : (
                <span className="text-[14px] text-white">
                  enter the password provided by the sender
                </span>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handlePasswordSubmit}
                className={`btn-primary ${!password ? 'bg-gray-500 cursor-not-allowed' : 'btn-primary'}`}
                disabled={!password}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center gap-10">
        <img src={download} alt="Download" />
        <img src={compress} alt="Compress" />
        <img src={share} alt="Share" />
      </div>
    </section>
  );
};

export { DownloadFile };
