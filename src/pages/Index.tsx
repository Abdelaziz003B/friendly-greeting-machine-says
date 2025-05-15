
import Navbar from '../components/Navbar';
import CategorySelector from '../components/CategorySelector';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import { ArrowRight, ShoppingBag, Zap, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Buy and sell anything <span className="text-ios-blue">easily</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  The marketplace where you can find everything you need or sell what you don't.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-ios">
                    Start Browsing
                  </button>
                  <button className="px-5 py-2 rounded-full border border-ios-blue text-ios-blue font-medium">
                    Sell Now
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787" 
                  alt="Marketplace" 
                  className="rounded-2xl shadow-ios-lg object-cover h-64 md:h-96 w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Why Use All For You?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-ios text-center p-6">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-ios-blue" />
                </div>
                <h3 className="font-bold text-xl mb-2">Easy Buying & Selling</h3>
                <p className="text-ios-gray">List your items in minutes and find what you need with our powerful search.</p>
              </div>
              
              <div className="card-ios text-center p-6">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-ios-blue" />
                </div>
                <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
                <p className="text-ios-gray">Connect with local buyers and sellers for quick transactions.</p>
              </div>
              
              <div className="card-ios text-center p-6">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-ios-blue" />
                </div>
                <h3 className="font-bold text-xl mb-2">Safe & Secure</h3>
                <p className="text-ios-gray">Verified users and secure messaging keep your transactions safe.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories & Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Browse Categories</h2>
              <button className="text-ios-blue font-medium flex items-center">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <CategorySelector />
            
            <div className="mt-12">
              <FeaturedProducts />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-ios-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to start selling?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
              Join thousands of users who buy and sell on All For You every day.
              It's quick, easy, and free to get started.
            </p>
            <button className="bg-white text-ios-blue px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Create a Listing
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
