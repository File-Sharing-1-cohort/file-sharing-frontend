import { useState, useEffect } from 'react';
import { Input } from '@/shared/ui';
import eye from '@/shared/ui/icons/eye-open.svg';
import eyeClosed from '@/shared/ui/icons/eye-close.svg';
import lock from '@/shared/ui/icons/lock.svg';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setErrorMessage('');
    }
  }, [isOpen]);

  const validatePassword = (newPassword: string) => {
    if (newPassword.length < 1) {
      setErrorMessage('Password must be between 1 and 30 characters');
    } else if (newPassword.length > 30) {
      setErrorMessage('Password must be less than 30 characters');
    } else {
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSave = () => {
    if (password.length < 1 || password.length > 30) {
      setErrorMessage('Password must be between 1 and 30 characters');
      return;
    }

    onSave(password);
    setErrorMessage('');
    setPassword('');
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center gap-10 gradient-modal p-6 rounded-lg shadow-lg w-[620px]">
        <div className="flex start justify-center gap-2">
          <img src={lock} alt="lock" />
          <h2 className="text-[20px] font-[500] text-white">
            Create a Password
          </h2>
        </div>
        <div className="w-full px-20">
          <span className="text-white">Password</span>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              className={`pr-10 ${errorMessage ? 'bg-[#FE51514D]' : ''}`}
              value={password}
              onChange={handlePasswordChange}
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
              Password must contain between 1 and 30 characters
            </span>
          )}
        </div>
        <div className="flex end gap-3">
          <button type="button" onClick={onClose} className="btn-primary">
            Exit
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`btn-primary ${!password || errorMessage ? 'bg-gray-500 cursor-not-allowed' : 'btn-primary'}`}
            disabled={!password}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export { ModalPassword };
