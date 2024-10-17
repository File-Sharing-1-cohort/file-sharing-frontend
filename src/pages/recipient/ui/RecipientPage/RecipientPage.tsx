import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import eye from '@/shared/ui/icons/eye-open.svg';

const RecipientPage = () => {
  return (
    <section className="flex flex-col items-center">
      <div className=" flex flex-col items-center justify-center bg-white p-6 rounded shadow-md px-16">
        <p className="mb-4">Insert password for viewing files</p>
        <div className="relative mb-4">
          <Input
            type="password"
            placeholder="Password"
            className="pl-4 pr-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <img
            className="absolute right-1 top-2 text-gray-400"
            src={eye}
            alt="eye"
          />
        </div>
        <Button className="justify-center px-10">Open</Button>
      </div>
    </section>
  );
};

export { RecipientPage };
