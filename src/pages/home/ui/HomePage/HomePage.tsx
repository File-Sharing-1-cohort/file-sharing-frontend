import { toast } from 'sonner';

const HomePage = () => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
        onClick={() => {
          toast.success('Hellooooooooooooooooooooooo!!!');
          toast.info('Toast');
          toast.error('Works!');
        }}
      >
        Click meeeeee =)
      </button>
    </div>
  );
};

export { HomePage };
