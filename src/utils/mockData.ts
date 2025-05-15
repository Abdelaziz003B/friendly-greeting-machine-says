
import { Product, User, ProductCategory } from '../models/types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    createdAt: new Date('2023-02-28'),
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    createdAt: new Date('2023-03-10'),
  }
];

export const categories: ProductCategory[] = [
  'Electronics',
  'Fashion',
  'Furniture',
  'Household',
  'Vehicles',
  'Property',
  'Other'
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro',
    description: 'Barely used, perfect condition. Comes with original box and accessories.',
    price: 899,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1681567686392-dab7667d6642?q=80&w=2070',
      'https://images.unsplash.com/photo-1695575191499-69eb5a4710b2?q=80&w=2070',
    ],
    seller: mockUsers[0],
    location: 'San Francisco, CA',
    condition: 'Like New',
    createdAt: new Date('2023-06-15'),
    isArchived: false,
  },
  {
    id: '2',
    title: 'Modern Leather Sofa',
    description: 'Beautiful brown leather sofa, only 1 year old. Moving and need to sell quickly.',
    price: 750,
    category: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070',
    ],
    seller: mockUsers[1],
    location: 'Chicago, IL',
    condition: 'Good',
    createdAt: new Date('2023-05-20'),
    isArchived: false,
  },
  {
    id: '3',
    title: 'Sony Noise Cancelling Headphones',
    description: 'WH-1000XM4 model, great sound quality with noise cancellation.',
    price: 199,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2788',
    ],
    seller: mockUsers[2],
    location: 'Austin, TX',
    condition: 'Good',
    createdAt: new Date('2023-06-01'),
    isArchived: false,
  },
  {
    id: '4',
    title: 'Nike Air Jordan 1',
    description: 'Size 10, worn only a few times. Original box included.',
    price: 180,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964',
    ],
    seller: mockUsers[0],
    location: 'New York, NY',
    condition: 'Like New',
    createdAt: new Date('2023-05-10'),
    isArchived: false,
  },
  {
    id: '5',
    title: '2019 Toyota Camry',
    description: '45,000 miles, excellent condition, one owner, all service records available.',
    price: 18500,
    category: 'Vehicles',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2069',
    ],
    seller: mockUsers[1],
    location: 'Dallas, TX',
    condition: 'Good',
    createdAt: new Date('2023-06-12'),
    isArchived: false,
  },
  {
    id: '6',
    title: 'MacBook Pro 16"',
    description: 'M1 Max, 32GB RAM, 1TB SSD. Perfect for developers and designers.',
    price: 2499,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070',
    ],
    seller: mockUsers[2],
    location: 'Seattle, WA',
    condition: 'Like New',
    createdAt: new Date('2023-06-05'),
    isArchived: true,
  },
];

export const getCurrentUser = (): User | null => {
  // In a real app, this would check authentication
  return mockUsers[0];
};

export const getWishlist = (): string[] => {
  // In a real app, this would come from an API
  return ['2', '5']; 
};
