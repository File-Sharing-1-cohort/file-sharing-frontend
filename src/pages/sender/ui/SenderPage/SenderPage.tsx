import { useState } from 'react';
import { UploadFile } from './UploadInput';
import { Progress } from '@/shared/ui';
import { useUploadFileMutation } from '@/shared/api';
import { ModalPassword } from './ModalPassword';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '@/app/FileContext';
import { toast } from 'sonner';

const SenderPage: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile] = useUploadFileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const { setFileId } = useFileContext();
  const navigate = useNavigate();

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadComplete = () => {
    setSelectedFile(null);
    setUploadProgress(null);
  };

  const handleUploadFile = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const toastId = 'upload-toast';
      toast.loading('Uploading file...', { id: toastId });

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (password) {
          formData.append('password', password);
        }
        uploadFileWithProgress(formData);
        console.log('Selected file:', selectedFile);
        console.log('FormData content:', formData.get('file'));
        const response = await uploadFile(formData).unwrap();
        if (response.id) {
          setFileId(response.id)
          console.log('FileID:', response.id);
        }
        console.log('Server response:', response);

        toast.success('File uploaded successfully', { id: toastId });

        handleUploadComplete();
        navigate('/download-link');
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

  const uploadFileWithProgress = (formData: FormData) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${import.meta.env.VITE_BASE_API_URL}/files`, true);

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
