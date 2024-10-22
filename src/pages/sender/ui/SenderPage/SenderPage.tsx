import { useState } from 'react';
import { UploadFile } from './UploadInput';
import { Progress } from '@/shared/ui';
import { useUploadFileMutation } from '@/shared/api';
import { ModalPassword } from './ModalPassword';
import { toast } from 'sonner';

const SenderPage: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile] = useUploadFileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadComplete = () => {
    setSelectedFile(null);
    setUploadProgress(null);
  };

  const uploadFileToS3 = (url: string, file: File, password: string | null) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', file.type);

      if (password) {
        xhr.setRequestHeader('X-File-password', password);
      }

      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          handleUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(file);
    });
  };

  const handleUploadFile = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const toastId = 'upload-toast';
      toast.loading('Uploading file...', { id: toastId });

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await uploadFile(formData).unwrap();
        const presignedUrl = response.presignedUrl;

        await uploadFileToS3(presignedUrl, selectedFile, password);

        handleUploadComplete();

        toast.success('File uploaded successfully', { id: toastId });
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload file', { id: toastId });
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error('No file selected!', { id: 'file-select-error' });
    }
  };

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
    toast.success('Password set successfully');
    setIsModalOpen(false);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setUploadProgress(null);
    setPassword(null);
  };

  return (
    <section className="flex flex-col gap-4 items-center p-10">
      {uploadProgress !== null && <Progress value={uploadProgress} />}
      <p>Fast file sharing without registration and restrictions</p>
      <UploadFile
        onUploadProgress={handleUploadProgress}
        setSelectedFile={setSelectedFile}
      />

      {selectedFile && (
        <ul>
          <li key={selectedFile.name}>{selectedFile.name}</li>
        </ul>
      )}

      <ModalPassword
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSetPassword}
      />

      {selectedFile && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 bg-gray-500 text-white rounded"
        >
          Set Password
        </button>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleUploadFile}
          className="py-2 px-4 bg-gray-500 text-white rounded"
          disabled={!selectedFile || isUploading}
        >
          Upload
        </button>
        <button
          onClick={handleCancelUpload}
          className="py-2 px-4 bg-gray-500 text-white rounded"
          disabled={!selectedFile}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export { SenderPage };
