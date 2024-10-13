import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface FORM {
  label: string;
  field: "input" | "textarea";
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

const CardWrapper: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
  <Link href={href}>
    <motion.div
      className='p-6 rounded-lg border border-second bg-second text-prim shadow-lg cursor-pointer font-sans relative overflow-hidden group h-full flex flex-col justify-between'
      style={{ cursor: 'url(/poin.png), auto' }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(10, 47, 53, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronRight className="w-6 h-6 text-prim" />
      </motion.div>
    </motion.div>
  </Link>
);

export const TemplateCard: React.FC<TEMPLATE> = (item) => {
  return (
    <CardWrapper href={`/dashboard/content/${item.slug}`}>
      <div className='flex justify-between items-start mb-4'>
        <Image src={item.icon} alt='icon' width={50} height={50} className="rounded-sm" />
        <span className='bg-prim text-second px-2 py-1 rounded-full text-xs font-semibold'>
          {item.category}
        </span>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>{item.name}</h2>
        <p className='text-text line-clamp-3 text-sm'>{item.desc}</p>
      </div>
    </CardWrapper>
  );
};

export const ImageGeneratorTemplate: React.FC = () => {
  return (
    <CardWrapper href="/dashboard/image-generator">
      <div className='flex justify-between items-start mb-4'>
        <Image src="https://cdn-icons-png.flaticon.com/128/13963/13963246.png" alt='Image Generator Icon' width={50} height={50} className="rounded-sm" />
        <div className='flex items-center'>
          <Pin className="w-6 h-6 text-prim mr-2" />
          <span className='bg-prim text-second px-2 py-1 rounded-full text-xs font-semibold'>
            AI Powered
          </span>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>Image Generator</h2>
        <p className='text-text line-clamp-3 text-sm'>Generate custom images with ease using our powerful image generator tool.</p>
      </div>
    </CardWrapper>
  );
};

export const CustomGeneratorTemplate: React.FC = () => {
  return (
    <CardWrapper href="/dashboard/custom-template">
      <div className='flex justify-between items-start mb-4'>
        <Image src="https://cdn-icons-png.flaticon.com/128/13963/13963247.png" alt='Custom Generator Icon' width={50} height={50} className="rounded-sm" />
        <div className='flex items-center'>
          <Pin className="w-6 h-6 text-prim mr-2" />
          <span className='bg-prim text-second px-2 py-1 rounded-full text-xs font-semibold'>
            Custom AI
          </span>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>Custom Generator</h2>
        <p className='text-text line-clamp-3 text-sm'>Create unique content with our custom generation tool, tailored to your needs.</p>
      </div>
    </CardWrapper>
  );
};

export const Translate: React.FC = () => {
  return (
    <CardWrapper href="/dashboard/translate">
      <div className='flex justify-between items-start mb-4'>
        <Image src="https://cdn-icons-png.flaticon.com/128/2793/2793765.png" alt='Audio Extracter Icon' width={50} height={50} className="rounded-sm" />
        <div className='flex items-center'>
          <Pin className="w-6 h-6 text-prim mr-2" />
          <span className='bg-prim text-second px-2 py-1 rounded-full text-xs font-semibold'>
            Translate
          </span>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>Translate</h2>
        <p className='text-text line-clamp-3 text-sm'>Translate from one language to another</p>
      </div>
    </CardWrapper>
  );
};

export const Voice: React.FC = () => {
  return (
    <CardWrapper href="/dashboard/Voice">
      <div className='flex justify-between items-start mb-4'>
        <Image src="https://cdn-icons-png.flaticon.com/128/7650/7650580.png" alt='Voice Generator Icon' width={50} height={50} className="rounded-sm" />
        <div className='flex items-center'>
          <Pin className="w-6 h-6 text-prim mr-2" />
          <span className='bg-prim text-back px-2 py-1 rounded-full text-xs font-semibold'>
            Voice AI
          </span>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>Voice Content Generator</h2>
        <p className='text-black line-clamp-3 text-sm'>Create unique content with our custom generation tool, tailored to your needs. Using Your Voice Command</p>
      </div>
    </CardWrapper>
  );
};

export const Entity: React.FC = () => {
  return (
    <CardWrapper href="/dashboard/entity">
      <div className='flex justify-between items-start mb-4'>
        <Image src="https://cdn-icons-png.flaticon.com/128/16466/16466015.png" alt='Voice Generator Icon' width={50} height={50} className="rounded-sm" />
        <div className='flex items-center'>
          <Pin className="w-6 h-6 text-prim mr-2" />
          <span className='bg-prim text-back px-2 py-1 rounded-full text-xs font-semibold'>
            Wikipedia
          </span>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>Entity Linking</h2>
        <p className='text-black line-clamp-3 text-sm'>Find the entity from a Paragraph and get the content from the Wikipedia.</p>
      </div>
    </CardWrapper>
  );
};

export const Summary: React.FC = () => {
  return (
    <CardWrapper href="/dashboard/summary">
      <div className='flex justify-between items-start mb-4'>
        <Image src="https://cdn-icons-png.flaticon.com/128/16466/16466015.png" alt='Voice Generator Icon' width={50} height={50} className="rounded-sm" />
        <div className='flex items-center'>
          <Pin className="w-6 h-6 text-prim mr-2" />
          <span className='bg-prim text-back px-2 py-1 rounded-full text-xs font-semibold'>
            Wikipedia
          </span>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xl mb-2 text-prim'>Entity Linking</h2>
        <p className='text-black line-clamp-3 text-sm'>Find the entity from a Paragraph and get the content from the Wikipedia.</p>
      </div>
    </CardWrapper>
  );
};