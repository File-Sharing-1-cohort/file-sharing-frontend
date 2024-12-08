import { useState } from 'react';
import { UploadFile } from './UploadInput';
import { Progress } from '@/shared/ui';
import { useUploadFileMutation } from '@/shared/api';
import { ModalPassword } from './ModalPassword';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '@/app/FileContext';
import { toast } from 'sonner';
import { FolderDownload } from '@/shared/ui/LoadingComponent';
import download from '@/shared/ui/icons/download-img.svg';
import compress from '@/shared/ui/icons/compress-img.svg';
import share from '@/shared/ui/icons/share-img.svg';
import basket from '@/shared/ui/icons/red-basket.svg';
import alert from '@/shared/ui/icons/alert-delete.svg';
import alertYellow from '@/shared/ui/icons/alert-yellow.svg';
import errorIcon from '@/shared/ui/icons/error.svg';
import success from '@/shared/ui/icons/alert-success.svg';

const SenderPage: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadFile] = useUploadFileMutation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setFileId } = useFileContext();
  const navigate = useNavigate();

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadComplete = () => {
    setSelectedFiles([]);
    setUploadProgress(null);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleToggleSwitch = () => {
    setIsSwitchOn(prevState => {
      const newState = !prevState;
      setIsModalOpen(newState);
      return newState;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSwitchOn(false);
  };

  const handleUploadFile = async () => {
    if (selectedFiles.length > 0) {
      const toastId = 'upload-toast';
      toast.loading('Uploading files...', { id: toastId });

      try {
          const formData = new FormData();
          selectedFiles.forEach((file) => {
              console.log("Appending file:", file);
              formData.append('files', file);
            });

            if (password) {
              formData.append('password', password);
            }

          formData.append('isCompressionNeeded', 'false');
          formData.append('expirationHours', '36');

          console.log('FormData:', [...formData.entries()]);
          setIsLoading(true);
          uploadFileWithProgress(formData);
          const response = await uploadFile(formData).unwrap();
          console.log('ServerResponse:', response);
          if (Array.isArray(response) && response.length > 0) {
            response.forEach(item => {
              if (item.id) {
                setFileId(item.id);
                console.log('File ID:', item.id);
              }
            });
          }
        toast.success('Files uploaded successfully!', {
          id: toastId,
          duration: 1000,
        });
        handleUploadComplete();
        setIsLoading(false);
        navigate('/download-link');
      } catch (error) {
        console.error('Upload error:', error);
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
    } else {
      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={errorIcon} alt="error" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                An error occurred while uploading the file
              </h4>
            </div>
            <div className="px-3 mt-2 text-customBlack">No files selected</div>
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
                Select file
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

  const uploadFileWithProgress = (formData: FormData) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${import.meta.env.VITE_BASE_API_URL}files`, true);

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        handleUploadProgress(progress);
      }
    };

    xhr.send(formData);
  };

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
    if (newPassword) {
      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-success border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={success} alt="success" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                Password set successfully
              </h4>
            </div>
            <div className="px-3 start mt-2 text-customBlack">
              Now you can share your file
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
    }
    setIsModalOpen(false);
  };

  const handleCancelFile = (fileToRemove: File) => {
    toast.custom(
      () => (
        <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-alert border rounded-lg shadow-lg">
          <div className="flex start gap-2">
            <img src={alert} alt="alert" />
            <h4 className="font-semibold text-customGray text-[24px] font-[600]">
              Deleting file
            </h4>
          </div>
          <div className="px-3 start mt-2 text-customBlack">
            Are you sure that you want to delete file?
          </div>
          <div className="flex end gap-6  mt-4 space-x-2">
            <button
              onClick={() => {
                toast.dismiss();
              }}
              className="px-4 py-2 border border-customBlue text-customGray bg-transparent rounded"
            >
              Exit
            </button>

            <button
              onClick={() => {
                toast.dismiss();
                setSelectedFiles(prevFiles =>
                  prevFiles.filter(file => file !== fileToRemove),
                );
              }}
              className="px-4 py-2 text-customGray bg-customBlue rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
        className: `
        fixed left-1/2 transform -translate-x-1/2
      `,
      },
    );
  };

  const MAX_TOTAL_SIZE = 50 * 1024 * 1024;

  const handleFileChange = (files: File[]) => {
    const totalSize =
      files.reduce((sum, file) => sum + file.size, 0) +
      selectedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE) {
      const message = `To download files larger than 50 MB, you need to compress them`;
      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-yellow border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={alertYellow} alt="alertYellow" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                Too big size
              </h4>
            </div>
            <div className="px-3 mt-2 text-customBlack">{message}</div>
            <div className="flex end gap-6 mt-4 space-x-2">
              <button
                onClick={() => {
                  toast.dismiss();
                }}
                className="px-4 py-2 border border-customYellow text-customGray bg-transparent rounded"
              >
                Exit
              </button>
              <button
                onClick={() => {
                  toast.dismiss();
                }}
                className="px-4 py-2 text-customGray bg-customYellow rounded"
              >
                Compress file
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
      return;
    }

    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  return (
    <section className="flex flex-col gap-20">
      <div className="flex flex-col gap-4 items-center px-24 py-10">
        {uploadProgress !== null && <Progress value={uploadProgress} />}
        {selectedFiles.length > 0 && (
          <div className="flex flex-col items-start w-full px-10">
            <div className="w-full">
              <ul>
                {selectedFiles.map(file => (
                  <li key={file.name}>
                    <div className="flex justify-between">
                      <p className="text-[20px]">{file.name}</p>
                      <p className="text-[20px]">{formatFileSize(file.size)}</p>
                      <img
                        className="cursor-pointer"
                        onClick={() => handleCancelFile(file)}
                        src={basket}
                        alt="Remove file"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <div
                onClick={handleToggleSwitch}
                className={`w-16 h-8 rounded-full cursor-pointer ${isSwitchOn ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}
              >
                <div
                  className={`w-8 h-8 bg-white rounded-full transition-transform transform ${isSwitchOn ? 'translate-x-8' : 'translate-x-0'}`}
                />
              </div>
              <span className="text-[20px]">Set password</span>
            </div>

            <div onClick={handleUploadFile} className="btn-primary end">
              Save
            </div>
          </div>
        )}

        <h1 className="text-[48px] text-center">
          Fast file sharing without registration
        </h1>
        {isLoading ? (
          <FolderDownload />
        ) : (
          <UploadFile
            onUploadProgress={handleUploadProgress}
            onFileChange={handleFileChange}
          />
        )}
      </div>

      {isModalOpen && (
        <ModalPassword
          onClose={handleCloseModal}
          onSave={handleSetPassword}
          isOpen={isModalOpen}
        />
      )}

      <div className="flex justify-center items-center gap-10">
        <img src={download} alt="Download" />
        <img src={compress} alt="Compress" />
        <img src={share} alt="Share" />
      </div>

      <div className="flex flex-col gap-10 items-start gradient-service px-24 py-10">
        <h2 className="text-[32px] font-medium">How to use the service?</h2>
        <div className="flex gap-10">
          <div>
            <p className="mb-4 text-[20px] font-medium">To send files:</p>
            <ol className="list-decimal pl-5">
              <li className="leading-normal text-[20px]">
                Press button “Upload”, or drag and drop files into the blue
                window
              </li>
              <li className="leading-normal text-[20px]">
                After successful upload, add more files if needed
              </li>
              <li className="leading-normal text-[20px]">
                Set password if needed
              </li>
              <li className="leading-normal text-[20px]">
                Copy link and send it to a recipient
              </li>
            </ol>
          </div>
          <div>
            <p className="mb-4 text-[20px] font-medium">To receive files:</p>
            <ol className="list-decimal pl-5">
              <li className="leading-normal text-[20px]">
                Insert link in a browser’s address bar
              </li>
              <li className="leading-normal text-[20px]">
                Insert password if needed
              </li>
              <li className="leading-normal text-[20px]">
                Download whole package by clicking button “Download” in the
                right upper corner, or download separate files by selecting them
                with a checkbox
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SenderPage };
