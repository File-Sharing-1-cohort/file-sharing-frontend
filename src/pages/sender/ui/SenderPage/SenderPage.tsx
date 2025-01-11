import { useState } from 'react';
import { UploadFile } from './UploadInput';
import { Progress } from '@/shared/ui';
import { useUploadFileMutation } from '@/shared/api';
import { ModalPassword } from './ModalPassword';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '@/app/FileContext';
import { toast } from 'sonner';
import { FolderDownload } from '@/shared/ui/LoadingComponent';
import JSZip from 'jszip';
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
  const [uploadController, setUploadController] =
    useState<AbortController | null>(null);
  const { setFileId, setFileExpirationDate } = useFileContext();
  const navigate = useNavigate();

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadComplete = () => {
    setSelectedFiles([]);
    setUploadProgress(null);
  };

  const startUpload = () => {
    const controller = new AbortController();
    setUploadController(controller);
    handleUploadFile(controller);
  };

  const cancelUpload = () => {
    if (uploadController) {
      uploadController.abort();
      setUploadController(null);
    }
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
      if (prevState) setPassword(null);
      const newState = !prevState;
      setIsModalOpen(newState);
      return newState;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSwitchOn(false);
  };

  const handleUploadFile = async (controller: AbortController) => {
    if (selectedFiles.length > 0) {
      try {
        const formData = new FormData();
        let zipBlob: Blob | null = null;

      if (selectedFiles.length > 1) {
        const zip = new JSZip();
        selectedFiles.forEach((file) => {
          zip.file(file.name, file);
          console.log('Appending file to zip:', file);
        });

        zipBlob = await zip.generateAsync({ type: 'blob' });

        formData.append('files', zipBlob, 'archive.zip');
      } else {
        const file = selectedFiles[0];
        formData.append('files', file);
        console.log('Appending single file:', file);
      }

        const totalSize = selectedFiles.reduce(
          (sum, file) => sum + file.size,
          0,
        );
        formData.append(
          'toCompress',
          totalSize > MAX_TOTAL_SIZE ? 'true' : 'false',
        );

        if (password) {
          formData.append('password', password);
        }

        formData.append('expirationHours', '24');

        console.log('FormData:', [...formData.entries()]);
        setIsLoading(true);
        uploadFileWithProgress(formData, controller);
        const response = await uploadFile({
          formData,
          signal: controller.signal,
        }).unwrap();
        console.log('ServerResponse:', response);
        if (Array.isArray(response) && response.length > 0) {
          response.forEach(item => {
            if (item.id) {
              setFileId(item.id);
              const loadedDate = new Date(item.loadedAt);
              loadedDate.setHours(loadedDate.getHours() + item.expirationHours);
              const expirationDateString = loadedDate.toLocaleString();
              console.log('File ID:', item.id);
              setFileExpirationDate(expirationDateString);
            }
          });
        }

        handleUploadComplete();
        setIsLoading(false);
        navigate('/download-link');
      } catch (error) {
        console.error('Upload error:', error);
      }
    } else {
      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={errorIcon} alt="error" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600] whitespace-nowrap">
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
          duration: Infinity,
          position: 'top-center',
          className: `
                fixed left-1/2 transform -translate-x-1/2
              `,
        },
      );
    }
  };

  const uploadFileWithProgress = (
    formData: FormData,
    controller: AbortController,
  ) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${import.meta.env.VITE_BASE_API_URL}/files`, true);

    controller.signal.addEventListener('abort', () => {
      xhr.abort();
      setUploadProgress(null);
      setIsLoading(false);
      console.log('Upload abortet');
    });

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
              <h4 className="font-semibold text-customGray text-[24px] font-[600] whitespace-nowrap">
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
          duration: Infinity,
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
            <h4 className="font-semibold text-customGray text-[24px] font-[600] whitespace-nowrap">
              Deleting file
            </h4>
          </div>
          <div className="start mt-2 text-customBlack">
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
              <h4 className="font-semibold text-customGray text-[24px] font-[600] whitespace-nowrap">
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
                  setSelectedFiles(prevFiles => [...prevFiles, ...files]);
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
          duration: Infinity,
          position: 'top-center',
          className: `
                fixed left-1/2 transform -translate-x-1/2
              `,
        },
      );
    } else {
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col min-h-[calc(100vh-6.25rem)] justify-between">
        <div className="flex flex-col items-center px-40">
          {uploadProgress !== null && <Progress value={uploadProgress} />}

          {isLoading ? (
            <div className="flex flex-col items-center gap-6 mt-6">
              <FolderDownload
                title="Uploading"
                description="This may take a few seconds"
              />
              <div className="flex items-center border-b border-customRedBorder py-2 gap-4">
                <button
                  className="btn_cancel text-[24px] font-[300] font-mallana"
                  onClick={cancelUpload}
                >
                  Cancel
                </button>
                <img src={basket} alt="Cancel upload" />
              </div>
            </div>
          ) : (
              <div>
                {selectedFiles.length > 0 && (
                  <div className="flex flex-col items-start w-full px-10">
                    <div className="w-full">
                      <ul>
                        {selectedFiles.map((file, index) => (
                          <li key={file.name} className="py-4">
                            <div className="flex justify-between items-center">
                              <div className="flex w-4/5">
                                <p
                                  data-testid={`selected-file-name${index === 0 ? '' : '-' + index}`}
                                  className="text-[20px] max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                                >
                                  {file.name.split('.').slice(0, -1).join('.')}
                                </p>
                                <p className="text-[20px]">
                                  .{file.name.split('.').pop()}
                                </p>
                              </div>
                              <p className="text-[20px]">
                                {formatFileSize(file.size)}
                              </p>
                              <img
                                className="cursor-pointer ml-4"
                                onClick={() => handleCancelFile(file)}
                                src={basket}
                                alt="Remove file"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div
                        onClick={handleToggleSwitch}
                        className={`w-16 h-8 rounded-full cursor-pointer ${
                          isSwitchOn ? 'bg-red-300' : 'bg-red-100'
                        } transition-colors`}
                      >
                        <div
                          className={`w-7 h-7 m-[2px] ${
                            isSwitchOn
                              ? 'bg-gray-200 translate-x-8'
                              : 'bg-red-400 translate-x-0'
                          } rounded-full transition-transform`}
                        />
                      </div>
                      <span className="text-[20px]">Set password</span>
                    </div>

                    <div
                      onClick={!isLoading ? startUpload : undefined}
                      className={`mt-4 end btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
                    >
                      Save
                    </div>
                  </div>
                )}
                <h1 className="font-libre text-[48px] text-center mt-10 mb-20">
                  Fast file sharing without registration
                </h1>
                <UploadFile
                  onUploadProgress={handleUploadProgress}
                  onFileChange={handleFileChange}
                />
              </div>
          )}

          {isModalOpen && (
            <ModalPassword
              onClose={handleCloseModal}
              onSave={handleSetPassword}
              isOpen={isModalOpen}
            />
          )}

          <div className="flex justify-center items-center gap-10 py-6">
            <img src={download} alt="Download" />
            <img src={compress} alt="Compress" />
            <img src={share} alt="Share" />
          </div>
        </div>

        <div className="flex flex-col gap-6 items-start gradient-service px-44 py-10">
          <h2 className="text-[32px] font-medium">How to use the service?</h2>
          <div className="flex gap-6">
            <div className="flex-1">
              <p className="mb-4 text-[20px] font-medium">To send files:</p>
              <ol className="list-decimal pl-5">
                <li className="leading-normal text-[20px]">
                  Press the “Upload” button, or drag and drop files into the
                  blue window.
                </li>
                <li className="leading-normal text-[20px]">
                  After a successful upload, add more files if needed.
                </li>
                <li className="leading-normal text-[20px]">
                  Set a password, if required.
                </li>
                <li className="leading-normal text-[20px]">
                  Copy the link and send it to the recipient.
                </li>
              </ol>
            </div>
            <div className="flex-1">
              <p className="mb-4 text-[20px] font-medium">To receive files:</p>
              <ol className="list-decimal pl-5">
                <li className="leading-normal text-[20px]">
                  Insert the link in the browser’s address bar.
                </li>
                <li className="leading-normal text-[20px]">
                  Insert the password, if required.
                </li>
                <li className="leading-normal text-[20px]">
                  Download the whole package by clicking the “Download” button
                  in the upper-right corner, or download separate files by
                  selecting them with the checkbox.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SenderPage };
