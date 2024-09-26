
// import Templates from '@/app/(data)/Templates'
// import React, { useEffect, useState } from 'react'
// import TemplateCard from './TemplateCard'
// export interface TEMPLATE{
//   name:string,
//   desc:string,
//   icon:string,
//   category:string,
//   slug:string,
//   aiprompt:string,
//   form?:FORM[]
// }
// export interface FORM{
//   label:string,
//   field:string,
//   name:string,
//   required?:boolean
// }
// function TemplateListSection({UserSearchInput}:any) {
//   const [TemplatesList,SetTemplateList]=useState(Templates)
//   useEffect(()=>{
//     if(UserSearchInput){
//         const filterdata=Templates.filter(item=>
//           item.name.toLowerCase().includes(UserSearchInput.toLowerCase())
//         );
//         SetTemplateList(filterdata);
//     }else{
//       SetTemplateList(Templates);
//     }
//   },[UserSearchInput])
//   return (
//     <div className=' z-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 bg-white '>
//       <Image
//       {TemplatesList.map((item:TEMPLATE,index:number)=>(
//           <TemplateCard {...item}/>
//       ))}
//     </div>
//   )
// }

// export default TemplateListSection
import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import { TemplateCard, TEMPLATE, ImageGeneratorTemplate, CustomGeneratorTemplate, Voice } from './TemplateCard';

function TemplateListSection({ UserSearchInput }: any) {
  const [TemplatesList, SetTemplateList] = useState<TEMPLATE[]>(Templates);

  useEffect(() => {
    if (UserSearchInput) {
      const filterdata = Templates.filter(item =>
        item.name.toLowerCase().includes(UserSearchInput.toLowerCase())
      );
      SetTemplateList(filterdata);
    } else {
      SetTemplateList(Templates);
    }
  }, [UserSearchInput]);

  return (
    <div className='z-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 bg-white'>
    <ImageGeneratorTemplate/>
    <CustomGeneratorTemplate/>
    <Voice/>
    {/* <VideoGeneratorTemplate/> */}
      {TemplatesList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
