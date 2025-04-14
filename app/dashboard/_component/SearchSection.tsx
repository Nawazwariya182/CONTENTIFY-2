import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchSectionProps {
  onSearchInput: (value: string) => void;
  onCategorySelect: (category: string) => void;
  categories: string[];
}

function SearchSection({
  onSearchInput,
  onCategorySelect,
  categories,
}: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = () => {
    onSearchInput(searchTerm);
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
  };

  return (
    <div className="p-8 sm:p-12 bg-second flex flex-col justify-center items-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-prim text-center">
        Explore AI-Powered Templates
      </h2>
      <p className="text-lg mb-6 text-text text-center max-w-2xl">
        Discover the perfect template for your next project. What would you like
        to create today?
      </p>
      <div className="w-full max-w-4xl flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="relative w-full sm:w-2/3">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-text border-acc focus:ring-back focus:border-back"
            style={{ cursor: "url(/type.png), auto" }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-acc" />
        </div>

        <Button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-prim hover:bg-back text-back hover:text-acc hover:border-2 hover:border-acc"
          style={{ cursor: "url(/poin.png), auto" }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchSection;
