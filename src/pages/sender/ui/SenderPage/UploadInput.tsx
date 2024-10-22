import React, { useCallback, useState } from 'react';
import { Input } from '@/shared/ui';
import uploadFileIcon from '@/shared/ui/icons/upload-file.svg';
import { toast } from 'sonner';

interface UploadFileProps {
  onUploadProgress: (progress: number) => void;
  setSelectedFile: (file: File | null) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ setSelectedFile }) => {
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
    'application/x-rar-compressed',
  ];

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

      const validFiles = newFiles.filter(file =>
        acceptedFileTypes.includes(file.type),
      );
      if (validFiles.length === 0) {
        const message = 'Invalid file type. Please upload a valid file.';
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      setSelectedFile(validFiles[0]);
      setErrorMessage(null);
      toast.success('File selected successfully!');
    },
    [setSelectedFile],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      const message = 'No files selected';
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    const validFiles = Array.from(files).filter(file =>
      acceptedFileTypes.includes(file.type),
    );
    if (validFiles.length === 0) {
      const message = 'Invalid file type. Please upload a valid file.';
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setSelectedFile(validFiles[0]);
    setErrorMessage(null);
    toast.success('File selected successfully!');
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
      className={`flex flex-col gap-3 items-center p-32 ${isDragging ? 'bg-gray-500' : 'bg-gray-300'}`}
      onDrop={handleDrop}
      onDragOver={event => event.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <label className="flex gap-5 items-center cursor-pointer bg-gray-300 rounded-md p-2 border border-black">
        <img src={uploadFileIcon} alt="uploadFile" />
        <span>Select files</span>
        <Input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.pdf,.zip,.rar"
          onChange={handleFileChange}
        />
      </label>
      <p>or drag and drop files here</p>
      <p>Max size 50 MB</p>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export { UploadFile };
