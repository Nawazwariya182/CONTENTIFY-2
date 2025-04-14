/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client";

import React, { useContext, useState, useRef, useEffect } from "react";
import FormSection from "../_component/FormSection";
import OutputSection from "../_component/OutputSection";
import { TEMPLATE } from "../../_component/TemplateCard";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { generateCombinedText } from "@/utils/AIModel";
import { db } from "@/utils/db";
import { aioutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UpdateContext } from "@/app/(context)/UpdateContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedtemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"],
  );

  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const [aiOut, setaioutput] = useState<string>("");
  const Router = useRouter();
  const { TotalUsage, SetTotalUsage } = useContext(TotalUsageContext);
  const { UpdateCredit, setupdatecredit } = useContext(UpdateContext);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement
        ) {
          input.blur();
        }
      });
    }
  }, []);

  const GenerateAIContent = async (FormData: any) => {
    if (TotalUsage >= 15000) {
      return;
    }

    setloading(true);
    const selectedprompt = selectedtemplate?.aiprompt;
    const finalprompt = JSON.stringify(FormData) + ", " + selectedprompt;

    try {
      const result = await generateCombinedText(finalprompt);
      setaioutput(result);
      await SaveOutputToDB(
        JSON.stringify(FormData),
        selectedtemplate?.slug,
        result,
      );
    } catch (error) {
      console.error("Error generating AI content:", error);
      setaioutput(
        "An error occurred while generating content. Please try again.",
      );
    } finally {
      setloading(false);
    }
  };

  const SaveOutputToDB = async (
    formdata: string,
    slug: string | undefined,
    airesponse: string,
  ) => {
    await db.insert(aioutput).values({
      formdata: formdata || "",
      airesponse: airesponse || "",
      templateslug: slug || "",
      createby: user?.primaryEmailAddress?.emailAddress || "",
      createdat: new Date().toISOString(),
    });
  };

  if (!selectedtemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button
          className="bg-prim text-back hover:bg-white hover:text-text hover:border-2 hover:border-acc w-20 transition-all"
          style={{ cursor: "url(/poin.png), auto" }}
        >
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedtemplate={selectedtemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
          currentUsage={0}
          formRef={formRef}
        />
        <div className="col-span-2">
          <OutputSection aioutput={aiOut} />
        </div>
      </div>
      <div className="mt-8 text-center"></div>
    </div>
  );
}

export default CreateNewContent;
