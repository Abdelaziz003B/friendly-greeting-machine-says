
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  seller: User;
  location: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  createdAt: Date;
  isArchived: boolean;
}

export type ProductCategory = 
  | 'Electronics'
  | 'Fashion'
  | 'Furniture'
  | 'Household'
  | 'Vehicles' 
  | 'Property'
  | 'Other';
