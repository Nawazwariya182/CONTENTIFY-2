/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import dynamic from "next/dynamic";

const EnhancedCustomTemplateGenerator = dynamic(
  () => import("@/components/EnhancedCustomTemplateGenerator"),
  { ssr: false },
);

export default function CustomTemplatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <EnhancedCustomTemplateGenerator />
    </div>
  );
}
