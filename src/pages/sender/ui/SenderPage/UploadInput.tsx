import React, { useCallback, useState } from 'react';
import { Input } from '@/shared/ui';
import uploadFileIcon from '@/shared/ui/icons/upload-file.svg';
import { toast } from 'sonner';
import error from '@/shared/ui/icons/error.svg';

interface UploadFileProps {
  onUploadProgress?: (progress: number) => void;
  onFileChange: (files: File[]) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const isValidFileType = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const allowedExtensions = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'zip',
        'rar',
      ];

      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (allowedExtensions.includes(fileExtension || '')) {
        if (fileExtension === 'zip' || fileExtension === 'rar') {
          resolve(fileExtension);
        } else if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'xls' || fileExtension === 'xlsx') {
          resolve(fileExtension);
        } else {
          const reader = new FileReader();
          reader.onload = function () {
            const arr = new Uint8Array(reader.result as ArrayBuffer);

            if (
              arr[0] === 0x25 &&
              arr[1] === 0x50 &&
              arr[2] === 0x44 &&
              arr[3] === 0x46
            ) {
              resolve('pdf');
            } else if (arr[0] === 0xff && arr[1] === 0xd8 && arr[2] === 0xff) {
              resolve('jpeg');
            } else if (
              arr[0] === 0x89 &&
              arr[1] === 0x50 &&
              arr[2] === 0x4e &&
              arr[3] === 0x47 &&
              arr[4] === 0x0d &&
              arr[5] === 0x0a &&
              arr[6] === 0x1a &&
              arr[7] === 0x0a
            ) {
              resolve('png');
            } else if (
              arr[0] === 0x47 &&
              arr[1] === 0x49 &&
              arr[2] === 0x46 &&
              arr[3] === 0x38
            ) {
              resolve('gif');
            } else {
              resolve(null);
            }
          };

          reader.onerror = function () {
            reject('Error reading file');
          };

          reader.readAsArrayBuffer(file.slice(0, 10));
        }
      } else {
        resolve(null);
      }
    });
  };

  const validateFile = (file: File): Promise<string | null> => {
    return isValidFileType(file).then(fileType => {
      if (fileType) {
        return null;
      }
      return 'The selected file format is not supported.';
    });
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const files = Array.from(event.dataTransfer.files);
      if (files.length === 0) {
        toast.error('No files selected');
        return;
      }

      const errors: string[] = [];
      const validFiles: File[] = [];

      Promise.all(
        files.map(file =>
          validateFile(file).then(error => {
            if (error) {
              errors.push(error);
            } else {
              validFiles.push(file);
            }
          }),
        ),
      ).then(() => {
        if (errors.length > 0) {
          const message = `The selected file format is not supported. Supported formats: jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, zip, rar.`;
          toast.custom(
            () => (
              <div className="flex flex-col gap-5 items-center p-9 w-[600px] bg-toast-error border rounded-lg shadow-lg">
                <div className="flex start gap-2">
                  <img src={error} alt="error" />
                  <h4 className="font-semibold text-customGray text-[24px] font-[600] whitespace-nowrap">
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
            {
              duration: Infinity,
              position: 'top-center',
              className: 'fixed left-1/2 transform -translate-x-1/2',
            },
          );
        }

        if (validFiles.length > 0) {
          onFileChange(validFiles);
        }
      });
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
    const validFiles: File[] = [];

    Promise.all(
      files.map(file =>
        validateFile(file).then(error => {
          if (error) {
            errors.push(error);
          } else {
            validFiles.push(file);
          }
        }),
      ),
    ).then(() => {
      if (validFiles.length > 0) {
        onFileChange(validFiles);
      } else {
        toast.error(errors.join(', '));
      }
    });
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
      <label className="btn-primary hover:opacity-70 gap-4">
        <span className="text-[20px] min-w-fit">Select files</span>
        <img src={uploadFileIcon} alt="uploadFile" />
        <Input
          data-testid="select-files-input"
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
    </div>
  );
};

export { UploadFile };
