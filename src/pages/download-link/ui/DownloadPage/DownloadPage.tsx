import { useFileContext } from '@/app/FileContext';
import { Input } from "@/shared/ui";
import copy from '@/shared/ui/icons/copy.svg';
import { useEffect, useState } from "react";
import { toast } from 'sonner';

const DownloadPage = () => {
    const { fileId } = useFileContext();
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/files/${fileId}`);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch file. Status: ${response.status}. Details: ${errorText}`);
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('Error fetching file:', err.message);
                    setError(err.message);
                } else {
                    console.error('Unexpected error:', err);
                    setError('An unexpected error occurred.');
                }
                toast.error('Failed to fetch file');
            } finally {
                setLoading(false);
            }
        };

        fetchFile();

        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileId]);

    const handleCopyClick = () => {
        if (fileUrl) {
            navigator.clipboard.writeText(fileUrl)
                .then(() => {
                    toast.success('Link copied to clipboard!');
                })
                .catch(() => {
                    toast.error('Failed to copy link.');
                });
        } else {
            toast.error('No link available to copy.');
        }
    };

    const cleanFileUrl = (url: string | null) => {
        if (!url) return '';
        return url.replace(/^blob:/, '');
    };

    return (
        <section className="flex flex-col gap-4 items-center w-screen p-10">
            <div className="flex gap-4 items-center w-screen px-20">
                <Input 
                    value={fileUrl ? cleanFileUrl(fileUrl) : ''} 
                    className="w-full" 
                    readOnly 
                />
                <img src={copy} alt="Copy" onClick={handleCopyClick} />
                {fileUrl && !loading && (
                    <a 
                        href={fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
                    >
                        Завантажити Файл
                    </a>
                )}
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </section>
    );
};

export { DownloadPage };













