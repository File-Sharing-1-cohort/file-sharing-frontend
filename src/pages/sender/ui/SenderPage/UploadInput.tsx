import React, { useCallback, useState } from 'react';
import { Input } from '@/shared/ui';
import uploadFileIcon from '@/shared/ui/icons/upload-file.svg';
import { toast } from 'sonner';
import error from '@/shared/ui/icons/error.svg';
import alertYellow from '@/shared/ui/icons/alert-yellow.svg';

interface UploadFileProps {
  onUploadProgress: (progress: number) => void;
  onFileChange: (files: File[]) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/vnd.rar',
    'application/x-rar-compressed',
  ];

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const newFiles = Array.from(event.dataTransfer.files);

      if (newFiles.length === 0) {
        const message = 'No files selected';
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      const validFiles = newFiles.filter(file => {
        if (file.size > MAX_FILE_SIZE) {
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
              duration: Infinity,
              position: 'top-center',
              className: `
                fixed left-1/2 transform -translate-x-1/2
              `,
            },
          );

          return false;
        }

        return acceptedFileTypes.includes(file.type);
      });

      if (validFiles.length === 0) {
        const message =
          'The selected file format is not supported. The acceptable types of files include: jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, zip, rar. Or size is to big';
        toast.custom(
          () => (
            <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
              <div className="flex start gap-2">
                <img src={error} alt="error" />
                <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                  An error occurred while uploading the file
                </h4>
              </div>
              <div className="px-3 mt-2 text-customBlack">{message}</div>
              <div className="flex end gap-6 mt-4 space-x-2">
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
                  Select another file
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
        return;
      }

      onFileChange(validFiles);
      setErrorMessage(null);
    },
    [onFileChange],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      const message = 'No files selected';
      toast.custom(
        () => (
          <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
            <div className="flex start gap-2">
              <img src={error} alt="error" />
              <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                An error occurred while uploading the file
              </h4>
            </div>
            <div className="px-3 mt-2 text-customBlack">{message}</div>
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
      return;
    }

    const validFiles = Array.from(files).filter(file =>
      acceptedFileTypes.includes(file.type),
    );
    if (validFiles.length === 0) {
      const message =
        'The selected file format is not supported. The acceptable types of files include: jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, zip, rar. Or size is to big';
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    onFileChange(validFiles);
    setErrorMessage(null);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`flex flex-col gap-3 items-center w-full rounded-lg pt-44 pb-10 ${isDragging ? 'drag-gradient drag-backdrop opacity-70' : 'drag-gradient drag-backdrop'}`}
      onDrop={handleDrop}
      onDragOver={event => event.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <label className="btn-primary hover:opacity-70">
        <span className="text-[20px]">Select files</span>
        <img src={uploadFileIcon} alt="uploadFile" />
        <Input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.pdf,.zip,.rar"
          onChange={handleFileChange}
        />
      </label>

      <div className="flex flex-col items-center gap-16">
        <p className="text-[20px]">or drag and drop files here</p>
        <p className="text-[16px]">Max size 50 MB</p>
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export { UploadFile };
