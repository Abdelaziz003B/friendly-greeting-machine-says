
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface WishlistButtonProps {
  productId: string;
  initialState?: boolean;
}

const WishlistButton = ({ productId, initialState }: WishlistButtonProps) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(initialState || false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('wishlists')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .single();

        if (!error && data) {
          setIsWishlisted(true);
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWishlist();
  }, [productId, user]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to save items to your wishlist');
      return;
    }

    try {
      if (isWishlisted) {
        // Remove from wishlist
        await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        setIsWishlisted(false);
        toast.info('Removed from your wishlist');
      } else {
        // Add to wishlist
        await supabase
          .from('wishlists')
          .insert({
            user_id: user.id,
            product_id: productId,
            created_at: new Date().toISOString(),
          });

        setIsWishlisted(true);
        toast.success('Added to your wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  if (isLoading) {
    return (
      <button
        className="rounded-full p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
        aria-label="Loading wishlist status"
        disabled
      >
        <Heart className="h-5 w-5 text-gray-300" />
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWishlist();
      }}
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
