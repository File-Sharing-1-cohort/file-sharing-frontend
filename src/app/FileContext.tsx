import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileContextType {
  fileId: number | null;
  setFileId: (id: number | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fileId, setFileId] = useState<number | null>(null);

  return (
    <FileContext.Provider value={{ fileId, setFileId }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('Context Error');
  }
  return context;
};
