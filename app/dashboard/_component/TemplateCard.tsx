// import React from 'react';
// import { TEMPLATE } from './TemplateListSection';
// import Image from 'next/image';
// import Link from 'next/link';

// const TemplateCard: React.FC<TEMPLATE> = (item) => {
//   return (
//     <Link href={`/dashboard/content/${item.slug}`}>
//       <div className='p-5 shadow-md rounded-md border bg-secondary flex flex-col gap-3 cursor-pointer font-p hover:scale-105 transition-all'>
//         <Image src={item.icon} alt='icon' width={50} height={50} />
//         <h2 className='font-medium text-lg text-primary'>{item.name}</h2>
//         <p className='text-gray-600 line-clamp-3 text-s'>{item.desc}</p>
//       </div>
//     </Link>
//   );
// };

// export default TemplateCard;
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pin } from 'lucide-react';

// Define and export the TEMPLATE interface
// Updated TEMPLATE and FORM interfaces
export interface FORM {
  label: string;
  field: "input" | "textarea";  // Only allow "input" or "textarea"
  name: string;
  required?: boolean;
}

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  aiprompt: string;
  slug: string;
  form?: FORM[];
}


// TemplateCard component
export const TemplateCard: React.FC<TEMPLATE> = (item) => {
  return (
    <Link href={`/dashboard/content/${item.slug}`}>
      <div className='p-5 shadow-md rounded-md border bg-secondary flex flex-col gap-3 cursor-pointer font-p hover:scale-105 transition-all'style={{ cursor: 'url(/poin.png), auto' }}>
        <Image src={item.icon} alt='icon' width={50} height={50} />
        <h2 className='font-medium text-lg text-primary'>{item.name}</h2>
        <p className='text-gray-600 line-clamp-3 text-s'>{item.desc}</p>
      </div>
    </Link>
  );
};

// ImageGeneratorTemplate component
export const ImageGeneratorTemplate: React.FC = () => {
  return (
    <Link href="/dashboard/image-generator">
      <div className='p-5 shadow-md rounded-md border bg-secondary flex flex-col gap-3 cursor-pointer font-p hover:scale-105 transition-all'style={{ cursor: 'url(/poin.png), auto' }}>
        <div className='flex justify-between'>
        <Image src="https://cdn-icons-png.flaticon.com/128/13963/13963246.png" alt='Image Generator Icon' width={50} height={50} />
        <Pin />
        </div>
        <h2 className='font-medium text-lg text-primary'>Image Generator</h2>
        <p className='text-gray-600 line-clamp-3 text-s'>Generate custom images with ease using our powerful image generator tool.</p>
      </div>
    </Link>
  );
};

export const CustomGeneratorTemplate: React.FC = () => {
  return (
    <Link href="/dashboard/custom-template">
      <div className='p-5 shadow-md rounded-md border bg-secondary flex flex-col gap-3 cursor-pointer font-p hover:scale-105 transition-all' style={{ cursor: 'url(/curs.png), auto' }}>
        <div className='flex justify-between'>
          <Image src="https://cdn-icons-png.flaticon.com/128/13963/13963247.png" alt='Custom Generator Icon' width={50} height={50} />
          <Pin />
        </div>
        <h2 className='font-medium text-lg text-primary'>Custom Generator</h2>
        <p className='text-gray-600 line-clamp-3 text-s'>Create unique content with our custom generation tool, tailored to your needs.</p>
      </div>
    </Link>
  );
};

export const Voice: React.FC = () => {
  return (
    <Link href="/dashboard/Voice">
      <div className='p-5 shadow-md rounded-md border bg-secondary flex flex-col gap-3 cursor-pointer font-p hover:scale-105 transition-all' style={{ cursor: 'url(/curs.png), auto' }}>
        <div className='flex justify-between'>
          <Image src="https://cdn-icons-png.flaticon.com/128/13963/13963247.png" alt='Custom Generator Icon' width={50} height={50} />
          <Pin />
        </div>
        <h2 className='font-medium text-lg text-primary'>Custom Content Generator Through Voice</h2>
        <p className='text-gray-600 line-clamp-3 text-s'>Create unique content with our custom generation tool, tailored to your needs. Using Your Voice Command</p>
      </div>
    </Link>
  );
};

// export const VideoGeneratorTemplate: React.FC = () => {
//   return (
//     <Link href="/dashboard/Video-Generator">
//       <div className='p-5 shadow-md rounded-md border bg-secondary flex flex-col gap-3 cursor-pointer font-p hover:scale-105 transition-all'>
//         <Image src="https://cdn-icons-png.flaticon.com/128/13963/13963246.png" alt='Image Generator Icon' width={50} height={50} />
//         <h2 className='font-medium text-lg text-primary'>Video Generator</h2>
//         <p className='text-gray-600 line-clamp-3 text-s'>Generate custom Video with ease using our powerful image generator tool.</p>
//       </div>
//     </Link>
//   );
// };
