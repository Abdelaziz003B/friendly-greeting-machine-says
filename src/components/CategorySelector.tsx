
import { useState } from 'react';
import { categories } from '../utils/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <div className="my-6">
      <ScrollArea className="w-full whitespace-nowrap pb-4" orientation="horizontal">
        <div className="flex space-x-2 px-1">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedCategory === null 
                        ? 'bg-ios-blue text-white' 
                        : 'bg-ios-lightGray text-ios-darkGray'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                        ${selectedCategory === category 
                          ? 'bg-ios-blue text-white' 
                          : 'bg-ios-lightGray text-ios-darkGray'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategorySelector;
