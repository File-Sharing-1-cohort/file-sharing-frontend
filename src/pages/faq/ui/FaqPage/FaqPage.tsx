import { faqDto } from '@/entities/faq';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui';

const FaqPage = () => {
  return (
    <section className="container">
      <h1 className="text-[32px] font[500] m-4 text-center">Frequently Asked Questions</h1>

      <Accordion className="text-[20px] flex flex-col gap-4" type="multiple">
        {faqDto.map(({ title, description, slug }) => (
          <AccordionItem
            key={slug}
            className="border rounded-[16px] px-5 py-6 bg-gradient-faq"
            value={slug}
          >
            <AccordionTrigger className='text-[20px] font-[400]'>{title}</AccordionTrigger>
            <AccordionContent className='text-[20px] font-[400] px-6 mt-2'>{description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export { FaqPage };
