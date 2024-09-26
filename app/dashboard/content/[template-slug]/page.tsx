// 'use client';
// import React, { useContext, useState } from 'react';
// import FormSection from '../_component/FormSection';
// import OutputSection from '../_component/OutputSection';
// import { TEMPLATE } from '../../_component/TemplateCard';
// import Templates from '@/app/(data)/Templates';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import { chatSession } from '@/utils/AIModel';
// import { db } from '@/utils/db';
// import { aioutput } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment';
// import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
// import { useRouter } from 'next/navigation';
// import { UpdateContext } from '@/app/(context)/UpdateContext';

// interface PROPS {
//   params: {
//     'template-slug': string;
//   };
// }

// function CreateNewContent(props: PROPS) {
//   const selectedtemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['template-slug']);
//   const [loading, setloading] = useState(false);
//   const { user } = useUser();
//   const [aiOut, setaioutput] = useState<string>();
//   const Router = useRouter();
//   const { TotalUsage, SetTotalUsage } = useContext(TotalUsageContext);
//   const { UpdateCredit, setupdatecredit } = useContext(UpdateContext);

//   const GenerateAIContent = async (FormData: any) => {
//     if (TotalUsage >= 15000) {

//       return;
//     }

//     setloading(true);
//     const selectedprompt = selectedtemplate?.aiprompt;
//     const finalprompt = JSON.stringify(FormData) + ", " + selectedprompt;
//     const result = await chatSession.sendMessage(finalprompt);
//     setaioutput(result?.response.text());
//     await SaveOutputToDB(JSON.stringify(FormData), selectedtemplate?.slug, result?.response.text());
//     setloading(false);
//     setupdatecredit(Date.now());
//   };

//   const SaveOutputToDB = async (formdata: string, slug: string | undefined, airesponse: string) => {
//     await db.insert(aioutput).values({
//       formdata: formdata || '',
//       airesponse: airesponse || '',
//       templateslug: slug || '', // Provide a default value for slug
//       createby: user?.primaryEmailAddress?.emailAddress || '',
//       createdat: moment().format('DD/MM/yyyy'),
//     });
//   };
//   console.log('Selected Template:', selectedtemplate);
//   console.log('Slug:', props.params['template-slug']);
//   console.log('Templates:', Templates);


//   return (
//     <div className='p-10'>
//       <Link href={'/dashboard'}>
//         <Button className='bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all' style={{ cursor: 'url(/poin.png), auto' }}>
//           <ArrowLeft /> Back
//         </Button>
//       </Link>
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
//         <FormSection
//           selectedtemplate={selectedtemplate}
//           userFormInput={(v: any) => GenerateAIContent(v)}
//           loading={loading} currentUsage={0} />
//         <div className='col-span-2'>
//           <OutputSection aioutput={aiOut as string} />
//         </div>
//       </div>
//       <div className="mt-8 text-center">
//       </div>
//     </div>
//   );
// }

// export default CreateNewContent;
'use client';
import React, { useContext, useState } from 'react';
import FormSection from '../_component/FormSection';
import OutputSection from '../_component/OutputSection';
import { TEMPLATE } from '../../_component/TemplateCard';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AIModel';
import { db } from '@/utils/db';
import { aioutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/navigation';
import { UpdateContext } from '@/app/(context)/UpdateContext';

interface PROPS {
  params: {
    'template-slug': string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedtemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params['template-slug']
  );

  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const [aiOut, setaioutput] = useState<string>();
  const Router = useRouter();
  const { TotalUsage, SetTotalUsage } = useContext(TotalUsageContext);
  const { UpdateCredit, setupdatecredit } = useContext(UpdateContext);

  const GenerateAIContent = async (FormData: any) => {
    if (TotalUsage >= 15000) {
      return;
    }

    setloading(true);
    const selectedprompt = selectedtemplate?.aiprompt;
    const finalprompt = JSON.stringify(FormData) + ", " + selectedprompt;
    const result = await chatSession.sendMessage(finalprompt);
    setaioutput(result?.response.text());
    await SaveOutputToDB(JSON.stringify(FormData), selectedtemplate?.slug, result?.response.text());
    setloading(false);
    setupdatecredit(Date.now());
  };

  const SaveOutputToDB = async (formdata: string, slug: string | undefined, airesponse: string) => {
    await db.insert(aioutput).values({
      formdata: formdata || '',
      airesponse: airesponse || '',
      templateslug: slug || '', // Provide a default value for slug
      createby: user?.primaryEmailAddress?.emailAddress || '',
      createdat: moment().format('DD/MM/yyyy'),
    });
  };

  if (!selectedtemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div className='p-10'>
      <Link href={'/dashboard'}>
        <Button className='bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all' style={{ cursor: 'url(/poin.png), auto' }}>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <FormSection
          selectedtemplate={selectedtemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
          currentUsage={0}
        />
        <div className='col-span-2'>
          <OutputSection aioutput={aiOut as string} />
        </div>
      </div>
      <div className="mt-8 text-center"></div>
    </div>
  );
}

export default CreateNewContent;
