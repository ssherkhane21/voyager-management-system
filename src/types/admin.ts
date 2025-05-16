
// Admin related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Subadmin' | 'Manager';
  permissions: string[];
  createdAt: string;
}

// Operator related types
export interface BusOperator {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: 'active' | 'inactive' | 'pending';
  busCount: number;
  joinDate: string;
}

export interface Bus {
  id: string;
  operatorId: string;
  registrationNumber: string;
  type: string;
  capacity: number;
  amenities: string[];
  status: 'active' | 'inactive' | 'maintenance';
}

export interface BusBooking {
  id: string;
  busRegistrationNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  from: string;
  to: string;
  journeyDate: string;
  amount: number;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
}

// Hotel related types
export interface HotelManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  hotelName: string;
  address: string;
  city: string;
  state: string;
  status: 'active' | 'inactive' | 'pending';
  roomCount: number;
  joinDate: string;
}

export interface HotelBooking {
  id: string;
  hotelId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
}

// Taxi related types
export interface TaxiDriver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

// Bike related types
export interface BikeRider {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  bikeNumber: string;
  bikeModel: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

// Customer related types
export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
}

// Commission related types
export interface Commission {
  id: string;
  serviceType: string;
  percentage: number | null;
  fixedRate: number | null;
  commissionType: 'percentage' | 'fixed';
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
}

// Coupon related types
export interface Coupon {
  id: string;
  name: string;
  code: string;
  serviceType: string;
  discountType: 'percentage' | 'fixed';
  discountPercentage: number | null;
  discountAmount: number | null;
  startDate: string;
  expiryDate: string;
  isActive: boolean;
}

// Wallet related types
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// Notification related types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId?: string;
}

// Dashboard related types
export interface BookingSummary {
  service: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'flat';
  color: string;
}

export interface RevenueData {
  month: string;
  bus: number;
  hotel: number;
  taxi: number;
  bike: number;
}
