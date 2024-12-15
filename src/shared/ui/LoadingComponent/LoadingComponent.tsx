import folderDownload from '@/shared/ui/icons/folder-download.svg';

const FolderDownload = ({
  title = 'Downloading',
  description = 'This may take a few seconds',
}) => {
  return (
    <div className="flex flex-col items-center gap-12">
      <div>
        <img src={folderDownload} alt="folderDownload" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h4 className="font-libre text-customGray text-[32px] font-[500]">
          {title}
        </h4>
        <p className="font-libre text-customGray text-[20px] font-[500]">
          {description}
        </p>
      </div>
    </div>
  );
};

export { FolderDownload };
