
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { useToast } from './ui/use-toast';
import { Plus, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ProductCategory } from '../models/types';
import { ProductService } from '../services/ProductService';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Price must be a positive number',
  }),
  category: z.string(),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair', 'Poor']),
  location: z.string().min(2, 'Please enter a valid location'),
  freeShipping: z.boolean().default(false),
  shippingCost: z.string().optional(),
  expeditedAvailable: z.boolean().default(false),
  returnsAccepted: z.boolean().default(false),
  returnsPeriod: z.string().optional(),
});

const categories: ProductCategory[] = [
  'Electronics',
  'Fashion',
  'Furniture',
  'Household',
  'Vehicles',
  'Property',
  'Collectibles',
  'Sports',
  'Toys',
  'Business & Industrial',
  'Jewelry',
  'Other'
];

const SellItemButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      condition: 'New',
      location: '',
      freeShipping: false,
      shippingCost: '0',
      expeditedAvailable: false,
      returnsAccepted: false,
      returnsPeriod: '14',
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to upload images."
      });
      return;
    }

    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024; // in MB
    
    if (fileSize > 5) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Maximum file size is 5MB."
      });
      return;
    }

    setUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `product-images/${user.id}/${fileName}`;
      
      const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
        
      setImages([...images, data.publicUrl]);
      
      toast({
        title: "Image Uploaded",
        description: "Your image has been uploaded successfully."
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload image. Please try again."
      });
    } finally {
      setUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to list items.",
      });
      return;
    }
    
    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "Images Required",
        description: "Please upload at least one image for your listing.",
      });
      return;
    }
    
    try {
      const productData = {
        title: values.title,
        description: values.description,
        price: parseFloat(values.price),
        category: values.category as ProductCategory,
        images: images,
        seller_id: user.id,
        location: values.location,
        condition: values.condition,
        is_archived: false,
        is_auction: false,
        shipping_cost: values.freeShipping ? 0 : parseFloat(values.shippingCost || '0'),
        free_shipping: values.freeShipping,
        expedited_available: values.expeditedAvailable,
        returns_accepted: values.returnsAccepted,
        returns_period_days: values.returnsAccepted ? parseInt(values.returnsPeriod || '14') : undefined,
      };
      
      const productId = await ProductService.createProduct(productData);
      
      if (productId) {
        toast({
          title: "Listing Created",
          description: "Your item has been listed successfully.",
        });
        setIsOpen(false);
        form.reset();
        setImages([]);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: "destructive",
        title: "Error Creating Listing",
        description: "There was a problem creating your listing. Please try again.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button id="sell-button" className="bg-[#3665f3] hover:bg-[#3665f3]/90 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Sell</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter item title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Images</h3>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {images.map((image, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden h-20">
                    <img src={image} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
                {images.length < 4 && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-20 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-5 w-5 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              <p className="text-xs text-gray-500">Upload up to 4 images (max 5MB each)</p>
            </div>
            
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
                        <Input {...field} className="pl-6" placeholder="0.00" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, State" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Describe your item" 
                      className="min-h-[120px]" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Shipping Options</h3>
              
              <FormField
                control={form.control}
                name="freeShipping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded"
                      />
                    </FormControl>
                    <FormLabel>Free Shipping</FormLabel>
                  </FormItem>
                )}
              />
              
              {!form.watch('freeShipping') && (
                <FormField
                  control={form.control}
                  name="shippingCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Cost</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
                          <Input {...field} className="pl-6" placeholder="0.00" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="expeditedAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded"
                      />
                    </FormControl>
                    <FormLabel>Expedited Shipping Available</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Returns</h3>
              
              <FormField
                control={form.control}
                name="returnsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded"
                      />
                    </FormControl>
                    <FormLabel>Accept Returns</FormLabel>
                  </FormItem>
                )}
              />
              
              {form.watch('returnsAccepted') && (
                <FormField
                  control={form.control}
                  name="returnsPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Period (days)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1" max="60" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button type="submit" className="bg-[#3665f3] hover:bg-[#3665f3]/90">
                List Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SellItemButton;
