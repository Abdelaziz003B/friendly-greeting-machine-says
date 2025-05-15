
import { mockProducts } from '../utils/mockData';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // Filter out archived products for featured display
  const activeProducts = mockProducts.filter(product => !product.isArchived);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
