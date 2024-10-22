import { useState } from 'react';
import { Input } from '@/shared/ui';
import eye from '@/shared/ui/icons/eye-open.svg';
import eyeClosed from '@/shared/ui/icons/eye-close.svg';

interface ModalPasswordProps {
  onSave: (password: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const ModalPassword: React.FC<ModalPasswordProps> = ({
  onSave,
  onClose,
  isOpen,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (password.length < 1 || password.length > 30) {
      setErrorMessage('Password must be between 1 and 30 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    onSave(password);
    setErrorMessage('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Create a Password</h2>
        <div className="relative mb-4">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="pr-10"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <img
            onClick={() => setShowPassword(prev => !prev)}
            src={showPassword ? eyeClosed : eye}
            alt="Toggle visibility"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <div className="relative mb-4">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className="pr-10"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <img
            onClick={() => setShowPassword(prev => !prev)}
            src={showPassword ? eyeClosed : eye}
            alt="Toggle visibility"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export { ModalPassword };
