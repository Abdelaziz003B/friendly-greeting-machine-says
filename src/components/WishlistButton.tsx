
import { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { getWishlist } from '../utils/mockData';
import { toast } from '@/components/ui/sonner';

interface WishlistButtonProps {
  productId: string;
  initialState?: boolean;
}

const WishlistButton = ({ productId, initialState }: WishlistButtonProps) => {
  const wishlist = getWishlist();
  const [isWishlisted, setIsWishlisted] = useState(
    initialState !== undefined ? initialState : wishlist.includes(productId)
  );

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success('Added to your wishlist');
    } else {
      toast.info('Removed from your wishlist');
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="rounded-full p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWishlisted ? (
        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
      ) : (
        <Heart className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
};

export default WishlistButton;
