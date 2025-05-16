
// Admin related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Subadmin' | 'Manager';
  permissions: string[];
  createdAt: string;
}

// Define a ChartData type for the charts
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

// Operator related types
export interface BusOperator {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  status: 'active' | 'inactive' | 'pending' | 'Approved' | 'Rejected' | 'Submitted' | 'Blocked' | 'Pending';
  numberOfBuses?: number;
  busCount?: number;
  joinDate?: string;
  // Additional properties used in BusOperatorDetails.tsx
  profilePhoto?: string;
  idCardFront?: string;
  idCardBack?: string;
  businessLicense?: string;
  bankName?: string;
  bankAccountNumber?: string;
  accountHolderName?: string;
  bankAccountDetails?: string;
}

export interface Bus {
  id: string;
  operatorId: string;
  registrationNumber: string;
  type: string;
  capacity: number;
  amenities?: string[];
  status: 'active' | 'inactive' | 'maintenance';
  manufactureYear?: number;
  lastMaintenance?: string;
  insuranceValidTill?: string;
  route?: string;
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
  status: 'Completed' | 'Upcoming' | 'Cancelled' | 'Confirmed' | 'Pending';
}

// Hotel related types
export interface HotelManager {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  status: 'active' | 'inactive' | 'pending' | 'Approved' | 'Rejected' | 'Submitted' | 'Blocked' | 'Pending';
  roomCount?: number;
  joinDate?: string;
  // Additional properties used in HotelManagerDetails.tsx
  profilePhoto?: string;
  hotelName?: string;
  businessLicense?: string;
  hotelPhotos?: string[];
  locality?: string;
  landmark?: string;
  pinCode?: string;
  totalRooms?: number;
  standardRooms?: {
    price: number;
    numberOfRooms: number;
    amenities: string[];
    photos: string[];
  };
  luxuryRooms?: {
    price: number;
    numberOfRooms: number;
    amenities: string[];
    photos: string[];
  };
  checkInTime?: string;
  checkOutTime?: string;
  amenities?: string[];
  policyDocuments?: string;
  bankAccountNumber?: string;
  bankAccountDetails?: string;
  idCardFront?: string;
  idCardBack?: string;
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
  status: 'Completed' | 'Upcoming' | 'Cancelled' | 'Confirmed' | 'Pending';
}

// Taxi related types
export interface TaxiDriver {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  phone?: string;
  licenseNumber?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  city?: string;
  status: 'active' | 'inactive' | 'pending' | 'Approved' | 'Rejected' | 'Submitted' | 'Blocked' | 'Pending';
  joinDate?: string;
  // Additional properties used in TaxiDriverDetails.tsx
  age?: number;
  address?: string;
  experience?: number;
  idProofs?: string[];
  vehicleRegistrationNumber?: string;
  vehicleInsurance?: string;
  vehicleRegistrationCertificate?: string;
  vehiclePhotos?: string[];
}

// Taxi Booking related types
export interface TaxiBooking {
  id: string;
  customerName: string;
  driverName: string;
  from: string;
  to: string;
  rideDate: string;
  vehicleType: string;
  amount: number;
  status: string;
}

// Bike related types
export interface BikeRider {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  phone?: string;
  licenseNumber?: string;
  bikeNumber?: string;
  bikeModel?: string;
  vehicleType?: string;
  vehicleRegistrationNumber?: string;
  vehicleInsurance?: string;
  vehicleRegistrationCertificate?: string;
  vehiclePhotos?: string[];
  city?: string;
  status: 'active' | 'inactive' | 'pending' | 'Approved' | 'Rejected' | 'Submitted' | 'Blocked' | 'Pending';
  joinDate?: string;
  age?: number;
  address?: string;
  experience?: number;
  idProofs?: string[];
}

// Bike Booking related types
export interface BikeBooking {
  id: string;
  customerName: string;
  riderName: string;
  from: string;
  to: string;
  rideDate: string;
  vehicleType: string;
  amount: number;
  status: string;
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

export interface WalletTransaction {
  id: string;
  userId: string;
  userName: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  description: string;
}

// Notification related types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  recipientType?: string;
  read?: boolean;
  sentAt?: string;
  status?: string;
  userId?: string;
  createdAt?: string;
}

// Dashboard related types
export interface BookingSummary {
  service?: string;
  count?: number;
  percentage?: number;
  trend?: 'up' | 'down' | 'flat';
  color?: string;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  revenue: number;
}

export interface RevenueData {
  month: string;
  bus: number;
  hotel: number;
  taxi: number;
  bike: number;
}
