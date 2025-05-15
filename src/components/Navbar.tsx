
import { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import { getCurrentUser } from '../utils/mockData';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import SellItemButton from './SellItemButton';
import WishlistButton from './WishlistButton';

const Navbar = () => {
  const currentUser = getCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search functionality",
      description: "Search would go here in a real app",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3">
          {/* Top Row - Logo, Auth, Sell */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-[#3665f3]">
                eBay Clone
              </a>
            </div>
            
            {/* Right Side - Auth & Sell */}
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <>
                  <div className="hidden md:flex items-center space-x-3">
                    <SellItemButton />
                    <a href="/wishlist" className="text-gray-700 hover:text-[#3665f3] transition-colors">
                      Watchlist
                    </a>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Bell className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                  <div className="relative cursor-pointer">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <AuthButtons />
                  <SellItemButton />
                </div>
              )}
              
              {/* Mobile Menu Toggle */}
              <button className="md:hidden p-1" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
          
          {/* Second Row - Search */}
          <div className="flex items-center">
            <div className="w-full">
              <SearchBar />
            </div>
          </div>
          
          {/* Third Row - Categories */}
          <div className="hidden md:flex items-center space-x-6 text-sm pt-1">
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Saved</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Electronics</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Fashion</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Health & Beauty</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Home & Garden</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Sports</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Collectibles</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Industrial</a>
            <a href="#" className="text-gray-700 hover:text-[#3665f3] transition-colors">Motors</a>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden">
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-4">
                {!currentUser && (
                  <li className="py-2">
                    <div className="flex flex-col space-y-2">
                      <AuthButtons />
                      <SellItemButton />
                    </div>
                  </li>
                )}
                <li>
                  <a href="/" className="block py-2 text-gray-700">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="block py-2 text-gray-700">
                    Watchlist
                  </a>
                </li>
                <li>
                  <a href="/listings" className="block py-2 text-gray-700">
                    My Listings
                  </a>
                </li>
                {currentUser && (
                  <li>
                    <SellItemButton />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
