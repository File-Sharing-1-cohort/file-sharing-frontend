import { faqDto } from '@/entities/faq';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui';

const Faq = () => {
  return (
    <section className="container">
      <h1 className="title m-4">Часті запитання (FAQ)</h1>

      <Accordion className="text-[20px] flex flex-col gap-4" type="multiple">
        {faqDto.map(({ title, description, slug }) => (
          <AccordionItem
            key={slug}
            className="border border-black px-5"
            value={slug}
          >
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export { Faq };
