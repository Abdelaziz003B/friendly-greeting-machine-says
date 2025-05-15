
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getWishlist } from '../utils/mockData';
import { mockProducts } from '../utils/mockData';
import { Product } from '../models/types';

const Wishlist = () => {
  const wishlistIds = getWishlist();
  const wishlistProducts = mockProducts.filter(product => 
    wishlistIds.includes(product.id)
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
        
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600">Your wishlist is empty</h2>
            <p className="text-gray-500 mt-2">Add items to your wishlist to save them for later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
