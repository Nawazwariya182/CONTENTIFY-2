/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import {
  TemplateCard,
  TEMPLATE,
  ImageGeneratorTemplate,
  CustomGeneratorTemplate,
  Voice,
  Translate,
  Entity,
  Summary,
  Food,
  Disease,
  ImageTemplate,
  VideoGeneratorTemplate,
  PodcastGeneratorTemplate,
} from "./TemplateCard";

function TemplateListSection({ UserSearchInput }: any) {
  const [TemplatesList, SetTemplateList] = useState<TEMPLATE[]>(Templates);

  useEffect(() => {
    if (UserSearchInput) {
      const filterdata = Templates.filter((item) =>
        item.name.toLowerCase().includes(UserSearchInput.toLowerCase()),
      );
      SetTemplateList(filterdata);
    } else {
      SetTemplateList(Templates);
    }
  }, [UserSearchInput]);

  return (
    <div className="z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10 bg-white">
      <ImageGeneratorTemplate />
      {/* <VideoGeneratorTemplate /> */}
      {/* <PodcastGeneratorTemplate /> */}
      <Disease />
      <Translate />
      <CustomGeneratorTemplate />
      {/* <Image
          priorityTemplate /> */}
      <div className="sm:hidden lg:block">
        <Voice />
      </div>
      {TemplatesList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
