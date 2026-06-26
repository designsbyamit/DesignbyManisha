export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  bulkPricing: { minQty: number; price: number }[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  deliveryDays: number;
  specs: Record<string, string>;
  description: string;
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
  productCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  source: "browse" | "bom";
  bomLineItem?: string;
}

export interface Address {
  flatNo: string;
  building: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Confirmed" | "Dispatched" | "Out for Delivery" | "Delivered";
  items: { product: Product; quantity: number }[];
  address: Address;
  paymentMethod: string;
  subtotal: number;
  gst: number;
  delivery: number;
  total: number;
  trackingEvents: { date: string; status: string; description: string }[];
}

export interface Project {
  id: string;
  name: string;
  location: string;
  budget: number;
  spent: number;
  completionPercent: number;
  lastUpdated: string;
  orders: string[];
  pendingItems: string[];
}

export interface BomResult {
  lineItem: string;
  matchedProductId: string | null;
  quantity: number;
  alternatives: string[];
}
