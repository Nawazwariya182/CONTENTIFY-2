'use client'
import React, { useState } from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";

const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    // Add more categories as needed
];

function Dashboard() {
    const [UserSearchInput, SetUserSearchinput] = useState<string>("");

    return (
        <div className="overflow-y-auto">
            <SearchSection
                onSearchInput={(value: string) => SetUserSearchinput(value)}
                onCategorySelect={(category) => console.log(category)} // Replace with your actual handler
                categories={categories} // Pass the categories array here
            />
            <TemplateListSection UserSearchInput={UserSearchInput} />
        </div>
    );
}

export default Dashboard;
