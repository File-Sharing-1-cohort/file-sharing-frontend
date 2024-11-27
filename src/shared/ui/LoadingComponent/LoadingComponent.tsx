import folderDownload from '@/shared/ui/icons/folder-download.svg';

const FolderDownload = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      <div>
        <img src={folderDownload} alt="folderDownload" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-customGray text-[32px] font-[500]">Downloading</h4>
        <p className="text-customGray text-[20px] font-[500]">
          This may take a few seconds
        </p>
      </div>
    </div>
  );
};

export { FolderDownload };
