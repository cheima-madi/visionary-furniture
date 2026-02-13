
export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  model3D: string;
  stock: number;
  dimensions: string;
  colors: string[];
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
  product?: Product;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  salesByDay: { date: string; amount: number }[];
}
