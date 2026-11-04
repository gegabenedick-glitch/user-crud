export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Served';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  emoji: string;
  badge?: string;
}

export interface OrderLine {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface RestaurantOrder {
  id: string;
  customerName: string;
  table: string;
  items: OrderLine[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type NewRestaurantOrder = Omit<RestaurantOrder, 'id' | 'status' | 'createdAt'>;
