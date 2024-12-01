import React, { useCallback, useState } from 'react';
import { Input } from '@/shared/ui';
import uploadFileIcon from '@/shared/ui/icons/upload-file.svg';
import { toast } from 'sonner';
import error from '@/shared/ui/icons/error.svg';
import alertYellow from '@/shared/ui/icons/alert-yellow.svg';

interface UploadFileProps {
  onUploadProgress?: (progress: number) => void;
  onFileChange: (files: File[]) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip', 'rar',
  ];
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
      return 'The selected file format is not supported.';
    }
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
                onClick={() => toast.dismiss()}
                className="px-4 py-2 border border-customYellow text-customGray bg-transparent rounded"
              >
                Exit
              </button>
              <button
                onClick={() => toast.dismiss()}
                className="px-4 py-2 text-customGray bg-customYellow rounded"
              >
                Compress file
              </button>
            </div>
          </div>
        ),
        { duration: 3000, position: 'top-center', className: 'fixed left-1/2 transform -translate-x-1/2' },
      );
      return 'File size exceeds 50 MB.';
    }
    return null;
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const files = Array.from(event.dataTransfer.files);
      if (files.length === 0) {
        const message = 'No files selected';
        toast.error(message);
        return;
      }

      const errors: string[] = [];
      const validFiles = files.filter(file => {
        const error = validateFile(file);
        if (error) errors.push(error);
        return !error;
      });

      if (errors.length > 0) {
        const message =
          'The selected file format is not supported. Supported formats: jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, zip, rar.';
        toast.custom(
          () => (
            <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
              <div className="flex start gap-2">
                <img src={error} alt="error" />
                <h4 className="font-semibold text-customGray text-[24px] font-[600]">
                  File upload error
                </h4>
              </div>
              <div className="px-3 mt-2 text-customBlack">{message}</div>
              <div className="flex end gap-6 mt-4 space-x-2">
                <button
                  onClick={() => toast.dismiss()}
                  className="px-4 py-2 border border-customRed text-customGray bg-transparent rounded"
                >
                  Exit
                </button>
                <button
                  onClick={() => toast.dismiss()}
                  className="px-4 py-2 text-white bg-customRed rounded"
                >
                  Select another file
                </button>
              </div>
            </div>
          ),
          { duration: 3000, position: 'top-center', className: 'fixed left-1/2 transform -translate-x-1/2' },
        );
      }

      if (validFiles.length > 0) {
        onFileChange(validFiles);
        setErrorMessage(null);
      }
    },
    [onFileChange],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      toast.error('No files selected');
      return;
    }

    const errors: string[] = [];
    const validFiles = files.filter(file => {
      const error = validateFile(file);
      if (error) errors.push(error);
      return !error;
    });

    if (errors.length > 0) {
      const message = 'Some files have unsupported formats or sizes.';
      toast.error(message);
      setErrorMessage(message);
    }

    if (validFiles.length > 0) {
      onFileChange(validFiles);
      setErrorMessage(null);
    }
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
          className="hidden pointer-events-none"
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
