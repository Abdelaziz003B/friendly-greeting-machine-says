
import { mockProducts } from '../utils/mockData';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  // Filter out archived products for featured display
  const activeProducts = mockProducts.filter(product => !product.isArchived);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Featured Listings</h2>
        <Button variant="link" className="text-[#3665f3] flex items-center">
          See all <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
