'use client';
import React, { useState, useRef, useEffect } from 'react';
import TEMPLATE from '../../_component/TemplateListSection';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

interface FormItem {
  label: string;
  name: string;
  field: 'input' | 'textarea';
  required?: boolean;
}

interface PROPS {
  selectedtemplate?: {
    icon: string;
    name: string;
    desc: string;
    form?: FormItem[];
  };
  userFormInput: (formData: any) => void;
  loading: boolean;
  currentUsage: number;
  formRef: React.RefObject<HTMLFormElement>;
}

function FormSection({ selectedtemplate, userFormInput, loading, currentUsage, formRef }: PROPS) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const limit = 80000;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className='p-5 shadow-md border rounded-md font-p bg-white'>
      <Image src={selectedtemplate?.icon || '/default-icon.png'} alt='icon' width={60} height={60} />
      <h2 className='font-bold text-2xl mb-2 text-prim'>{selectedtemplate?.name}</h2>
      <p className='text-gray-600 text-sm'>{selectedtemplate?.desc}</p>
      <form className='mt-6' onSubmit={onSubmit} ref={formRef}>
        {selectedtemplate?.form?.map((item: FormItem, index: number) => (
          <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
            <label className='font-medium'>{item.label}</label>
            {item.field === 'input' ? (
              <Input name={item.name} required={item?.required} onChange={handleInputChange} style={{ cursor: 'url(/type.png), auto' }} />
            ) : item.field === 'textarea' ? (
              <Textarea name={item.name} required={item?.required} onChange={handleInputChange} style={{ cursor: 'url(/type.png), auto' }}/>
            ) : null}
          </div>
        ))}
        <Button
          type='submit'
          className='w-full py-6 bg-prim gap-3 hover:bg-back hover:text-acc hover:border-2 hover:border-prim transition-all'
          style={{ cursor: 'url(/poin.png), auto' }}
          disabled={loading || currentUsage > limit}
        >
          {loading && <Loader2Icon className='animate-spin text-acc' />}
          Create content
        </Button>
      </form>
    </div>
  );
}

export default FormSection;

