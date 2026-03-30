import { create } from 'zustand';

export interface User {
  name: string;
  email: string;
  username: string;
  initials: string;
  phone: string;
  location: string;
  isLoggedIn: boolean;
}

export interface Order {
  id: string;
  carrier: 'UPS' | 'FedEx' | 'USPS';
  service: string;
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  status: 'In Transit' | 'Delivered' | 'Cancelled';
  deliveryDate: string;
  price: number;
  trackingNumber: string;
  item: string;
  weight: string;
  dimensions: string;
  refundStatus?: 'pending' | 'approved' | 'denied';
  trackingSteps: TrackingStep[];
}

export interface TrackingStep {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface SavedAddress {
  id: string;
  label: string;
  name: string;
  address: string;
  isDefault?: boolean;
}

interface AppState {
  user: User | null;
  orders: Order[];
  recentTracking: string[];
  savedAddresses: SavedAddress[];
  notifications: boolean;
  setUser: (user: User | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addTracking: (trackingNumber: string) => void;
  addAddress: (address: SavedAddress) => void;
  removeAddress: (id: string) => void;
  setNotifications: (on: boolean) => void;
  logout: () => void;
  initFromStorage: () => void;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '10234',
    carrier: 'UPS',
    service: 'UPS Ground',
    senderName: 'Shawn Falte',
    senderAddress: '10000 Eldorado Drive, San Marcos, CA 92069',
    recipientName: 'Jessica Smith',
    recipientAddress: '2856 Cherry Blossom Ln, Portland, OR 97227',
    status: 'Delivered',
    deliveryDate: 'Apr 23, 2024',
    price: 31.80,
    trackingNumber: '1Z01234X21067889000',
    item: 'Shoes',
    weight: '3 lbs 8 oz',
    dimensions: '12" × 10" × 6"',
    trackingSteps: [
      { status: 'Delivered', location: 'Portland, OR', timestamp: 'Apr 23, 2024 2:15 PM', completed: true },
      { status: 'Out for Delivery', location: 'Portland, OR', timestamp: 'Apr 23, 2024 8:40 AM', completed: true },
      { status: 'Arrived at Local Facility', location: 'Portland, OR', timestamp: 'Apr 23, 2024 7:15 AM', completed: true },
      { status: 'Departed Nashville, TN Facility', location: 'Nashville, TN', timestamp: 'Apr 22, 2024 3:12 PM', completed: true },
      { status: 'Picked up by UPS', location: 'San Marcos, CA', timestamp: 'Apr 21, 2024 11:10 AM', completed: true },
    ],
  },
  {
    id: '10189',
    carrier: 'USPS',
    service: 'USPS Ground Advantage',
    senderName: 'Shawn Falte',
    senderAddress: '10000 Eldorado Drive, San Marcos, CA 92069',
    recipientName: 'Mike Johnson',
    recipientAddress: '445 S Figueroa St, Los Angeles, CA 90071',
    status: 'Delivered',
    deliveryDate: 'Jan 17, 2024',
    price: 18.50,
    trackingNumber: '9400111899223100045678',
    item: 'Book Set',
    weight: '2 lbs 4 oz',
    dimensions: '10" × 8" × 4"',
    trackingSteps: [
      { status: 'Delivered', location: 'Los Angeles, CA', timestamp: 'Jan 17, 2024 1:30 PM', completed: true },
      { status: 'Out for Delivery', location: 'Los Angeles, CA', timestamp: 'Jan 17, 2024 6:20 AM', completed: true },
      { status: 'In Transit', location: 'Phoenix, AZ', timestamp: 'Jan 16, 2024 9:45 PM', completed: true },
      { status: 'Accepted at USPS', location: 'San Marcos, CA', timestamp: 'Jan 14, 2024 3:00 PM', completed: true },
    ],
  },
  {
    id: '10156',
    carrier: 'FedEx',
    service: 'FedEx Ground',
    senderName: 'Shawn Falte',
    senderAddress: '10000 Eldorado Drive, San Marcos, CA 92101',
    recipientName: 'Sarah Williams',
    recipientAddress: '1200 NE Broadway, Portland, OR 97232',
    status: 'Delivered',
    deliveryDate: 'Jan 2, 2024',
    price: 42.15,
    trackingNumber: '794644790132',
    item: 'Electronics',
    weight: '5 lbs 0 oz',
    dimensions: '16" × 12" × 8"',
    trackingSteps: [
      { status: 'Delivered', location: 'Portland, OR', timestamp: 'Jan 2, 2024 11:20 AM', completed: true },
      { status: 'On FedEx Vehicle', location: 'Portland, OR', timestamp: 'Jan 2, 2024 7:00 AM', completed: true },
      { status: 'At Local FedEx Facility', location: 'Portland, OR', timestamp: 'Jan 1, 2024 11:30 PM', completed: true },
      { status: 'In Transit', location: 'Sacramento, CA', timestamp: 'Dec 31, 2023 4:15 PM', completed: true },
      { status: 'Picked Up', location: 'San Marcos, CA', timestamp: 'Dec 30, 2023 2:00 PM', completed: true },
    ],
  },
  {
    id: '10098',
    carrier: 'UPS',
    service: 'UPS Ground',
    senderName: 'Shawn Falte',
    senderAddress: '10000 Eldorado Drive, San Marcos, CA 92069',
    recipientName: 'David Chen',
    recipientAddress: '800 Market St, San Francisco, CA 94102',
    status: 'Delivered',
    deliveryDate: 'Dec 18, 2023',
    price: 25.60,
    trackingNumber: '1Z99887X65043210000',
    item: 'Clothing',
    weight: '1 lb 12 oz',
    dimensions: '14" × 10" × 4"',
    trackingSteps: [
      { status: 'Delivered', location: 'San Francisco, CA', timestamp: 'Dec 18, 2023 3:45 PM', completed: true },
      { status: 'Out for Delivery', location: 'San Francisco, CA', timestamp: 'Dec 18, 2023 9:00 AM', completed: true },
      { status: 'In Transit', location: 'Fresno, CA', timestamp: 'Dec 17, 2023 6:30 PM', completed: true },
      { status: 'Picked up by UPS', location: 'San Marcos, CA', timestamp: 'Dec 16, 2023 10:00 AM', completed: true },
    ],
  },
];

const MOCK_ADDRESSES: SavedAddress[] = [
  { id: '1', label: 'Home', name: 'Stephen Fisher', address: '10000 Eldorado Drive, San Marcos, CA 92069', isDefault: true },
  { id: '2', label: 'Office', name: 'Stephen Fisher', address: '1201 Las Vegas Ave, San Diego, CA 92101' },
];

const save = (key: string, data: unknown) => localStorage.setItem(key, JSON.stringify(data));
const load = <T,>(key: string): T | null => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
};

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  orders: [],
  recentTracking: [],
  savedAddresses: [],
  notifications: true,

  setUser: (user) => { set({ user }); save('mobiship_user', user); },

  addOrder: (order) => {
    const orders = [order, ...get().orders];
    set({ orders });
    save('mobiship_orders', orders);
  },

  updateOrder: (id, updates) => {
    const orders = get().orders.map(o => o.id === id ? { ...o, ...updates } : o);
    set({ orders });
    save('mobiship_orders', orders);
  },

  addTracking: (trackingNumber) => {
    const list = [trackingNumber, ...get().recentTracking.filter(t => t !== trackingNumber)].slice(0, 5);
    set({ recentTracking: list });
    save('mobiship_tracking', list);
  },

  addAddress: (address) => {
    const addresses = [...get().savedAddresses, address];
    set({ savedAddresses: addresses });
    save('mobiship_addresses', addresses);
  },

  removeAddress: (id) => {
    const addresses = get().savedAddresses.filter(a => a.id !== id);
    set({ savedAddresses: addresses });
    save('mobiship_addresses', addresses);
  },

  setNotifications: (on) => {
    set({ notifications: on });
    save('mobiship_notifications', on);
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('mobiship_user');
  },

  initFromStorage: () => {
    const user = load<User>('mobiship_user');
    const orders = load<Order[]>('mobiship_orders') || MOCK_ORDERS;
    const recentTracking = load<string[]>('mobiship_tracking') || ['1Z01234X21067889000', '9400111899223100045678'];
    const savedAddresses = load<SavedAddress[]>('mobiship_addresses') || MOCK_ADDRESSES;
    const notifications = load<boolean>('mobiship_notifications') ?? true;

    if (!load('mobiship_orders')) save('mobiship_orders', MOCK_ORDERS);
    if (!load('mobiship_addresses')) save('mobiship_addresses', MOCK_ADDRESSES);
    if (!load('mobiship_tracking')) save('mobiship_tracking', recentTracking);

    set({ user, orders, recentTracking, savedAddresses, notifications });
  },
}));
