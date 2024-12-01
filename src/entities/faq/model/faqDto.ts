import { IFaqDto } from '../types/IFaqDto';

const faqDto: IFaqDto[] = [
  {
    id: 1,
    title: 'Is it free to use the service?',
    description:
      'Yes. The service is out-of-charge.',
    slug: 'do-i-need-to-pay',
  },
  {
    id: 2,
    title: 'Should I register to send files?',
    description:
      'No. You don’t need any registration or authorization to use the service.',
    slug: 'is-registration-required',
  },
  {
    id: 3,
    title: 'Should recipient be registered to send files?',
    description:
      'No, sender as well as repicient can send files without registration.',
    slug: 'does-recipient-need-registration',
  },
  {
    id: 4,
    title: 'Which formats does the service accept?',
    description:
      'The acceptable types of files include: jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, zip, rar.',
    slug: 'file-formats-supported',
  },
  {
    id: 5,
    title:
      'If I want to send a file in a different format, do I have to convert it on a side service?',
    description:
      'No. You can convert files on our FileSharing from/into the following formats: jpg, jpeg, png, gif, doc, docx, xls, xlsx, pdf, zip, rar.',
    slug: 'convert-files-to-different-format',
  },
  {
    id: 6,
    title: 'How long does a link is stored?',
    description:
      'The link is stored during 24h after it was generated.',
    slug: 'how-long-are-files-stored',
  },
  {
    id: 7,
    title: 'Is file transfer confidential?',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, error fuga. Dolor, cumque. Eligendi labore officia, ad explicabo repellat assumenda ipsum asperiores consectetur provident iure officiis laudantium animi velit sit!',
    slug: 'is-file-transfer-confidential',
  },
  {
    id: 8,
    title: 'Can I choose and download separate files from the package I recieved?',
    description:
      'Yes. You can download whole package by pressing button “Download” against the package name, or you can also donwload separate files by selecting them with checkbuttons near files.',
    slug: 'download-individual-files',
  },
  {
    id: 9,
    title: 'How many files can I send in one link?',
    description:
      'There is no limit for the number of files you send. The whole size of the package in one link should not exceed 50 MB. ',
    slug: 'how-many-files-can-i-send',
  },
  {
    id: 10,
    title: 'My package exceeds maximum size of 50 MB. What should I do?',
    description:
      'In case total size of your transfer exceeds 50 MB, FileSharing will offer you to archieve files or compress them during the upload. ',
    slug: 'maximal-size-file',
  },
];

export { faqDto };
