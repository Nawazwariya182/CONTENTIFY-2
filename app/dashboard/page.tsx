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
import React, { useState } from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";

const categories = [
  "All",
  "Image",
  "Text",
  "Voice",
  "Translate",
  "Entity",
  "Summary",
  "Food",
  "Disease",
  "Image",
  "Custom",
  "AI"
];

function Dashboard() {
  const [UserSearchInput, SetUserSearchinput] = useState<string>("");

  return (
    <div className="overflow-y-auto">
      <SearchSection
        onSearchInput={(value: string) => SetUserSearchinput(value)}
        onCategorySelect={(category) => console.log(category)} 
        categories={categories}
      />
      <TemplateListSection UserSearchInput={UserSearchInput} />
    </div>
  );
}

export default Dashboard;
