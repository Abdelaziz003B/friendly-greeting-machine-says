
import { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { getCurrentUser } from '../utils/mockData';
import { useToast } from '@/components/ui/use-toast';

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

  const handleSignIn = () => {
    toast({
      title: "Authentication",
      description: "Sign in would go here in a real app",
    });
  };
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-ios-blue">
              All For You
            </a>
          </div>
          
          {/* Search Bar - Hide on Mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-6">
            <div className="search-ios flex-1 max-w-lg mx-auto flex items-center">
              <Search className="h-5 w-5 text-ios-gray mr-2" />
              <input
                type="text"
                placeholder="Search for anything..."
                className="bg-transparent border-none w-full focus:outline-none"
              />
            </div>
          </form>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <button className="hidden md:flex btn-ios">
                  Sell
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Bell className="h-6 w-6 text-ios-darkGray" />
                </button>
                <div className="relative cursor-pointer">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
              </>
            ) : (
              <button 
                className="hidden md:block btn-ios"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-1" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-ios-darkGray" />
              ) : (
                <Menu className="h-6 w-6 text-ios-darkGray" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Only show on mobile */}
        <div className="mt-3 md:hidden">
          <div className="search-ios flex items-center">
            <Search className="h-5 w-5 text-ios-gray mr-2" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="bg-transparent border-none w-full focus:outline-none text-sm"
            />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-ios-lg md:hidden">
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-4">
                <li>
                  <a href="/" className="block py-2 text-ios-darkGray">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="block py-2 text-ios-darkGray">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="/listings" className="block py-2 text-ios-darkGray">
                    My Listings
                  </a>
                </li>
                <li>
                  <button className="btn-ios w-full">
                    Sell Something
                  </button>
                </li>
                {!currentUser && (
                  <li>
                    <button className="btn-ios w-full" onClick={handleSignIn}>
                      Sign In
                    </button>
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
