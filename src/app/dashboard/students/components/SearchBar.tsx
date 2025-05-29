// src/app/dashboard/students/components/SearchBar.tsx
'use client';

import { Search } from 'lucide-react';

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ 
  query, 
  onQueryChange, 
  placeholder = "輸入學生姓名" 
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-10 text-gray-700 bg-teal-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:bg-white transition-colors"
      />
    </div>
  );
}