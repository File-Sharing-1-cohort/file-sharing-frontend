import { toast } from 'sonner';
import { useDebounceCallback } from 'usehooks-ts';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
  Input,
  Label,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

import { useCheckApiQuery } from '@/shared/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { data } = useCheckApiQuery();
  console.log(data);
  const debounced = useDebounceCallback(
    () => {
      console.log(19000);
      toast.success('Hello');
    },
    500,
    { leading: true },
  );

  return (
    <div>
      <Button variant="secondary" onClick={debounced}>
        Click meeeeee =)
      </Button>
      <Button asChild>
        <Link to="/faq">FAQ</Link>
      </Button>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Progress value={33} />

      <Input placeholder="get" />

      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
};

export { HomePage };
