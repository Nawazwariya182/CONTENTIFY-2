'use client'
import React, { useState } from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";
import { ClerkProvider } from "@clerk/nextjs";
function Dashboard(){
    const [UserSearchInput,SetUserSearchinput]= useState<string>()
return (
        <div>
            {
                
            }
            <SearchSection onSearchInput={(value:string)=>SetUserSearchinput(value)} />
            {
                
            }
            <TemplateListSection UserSearchInput={UserSearchInput}/>
        </div>
)
}
export default Dashboard