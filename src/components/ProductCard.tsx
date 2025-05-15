
import { Product } from '../models/types';
import { formatDistanceToNow } from 'date-fns';
import WishlistButton from './WishlistButton';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // In a real app, we would navigate to the product detail page
    // navigate(`/product/${product.id}`);
    console.log(`Viewing product: ${product.title}`);
  };
  
  return (
    <div 
      className="card-ios transition-transform duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-48 w-full object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <WishlistButton productId={product.id} />
        </div>
        {product.isArchived && (
          <div className="absolute bottom-2 left-2 bg-gray-800/80 text-white text-xs py-1 px-2 rounded-full">
            Archived
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between">
          <h3 className="font-medium text-lg truncate">{product.title}</h3>
          <p className="font-bold text-ios-blue">${product.price}</p>
        </div>
        <p className="text-ios-gray text-sm truncate my-1">{product.location}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-ios-gray">
            {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
          </span>
          <span className="text-xs px-2 py-1 bg-ios-lightGray rounded-full">
            {product.condition}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
