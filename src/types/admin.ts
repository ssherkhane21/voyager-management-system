
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

export interface BookingSummary {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  revenue: number;
}

export interface BusOperator {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: 'Approved' | 'Pending' | 'Submitted' | 'Rejected' | 'Blocked';
  numberOfBuses: number;
  profilePhoto?: string;
  address?: string;
  identityCard?: string;
  businessLicense?: string;
  bankAccountNumber?: string;
  bankAccountDetails?: string;
  idCardFront?: string;
  idCardBack?: string;
  bankName?: string;
  accountHolderName?: string;
}

export interface HotelManager {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: 'Approved' | 'Pending' | 'Submitted' | 'Rejected' | 'Blocked';
  profilePhoto?: string;
  hotelName?: string;
  businessLicense?: string;
  hotelPhotos?: string[];
  address?: string;
  city?: string;
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
  status: string;
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
  status: string;
}

export interface TaxiDriver {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: 'Approved' | 'Rejected';
  age?: number;
  address?: string;
  experience?: number;
  idProofs?: string[];
  vehicleType?: 'Car' | 'Bike';
  vehicleRegistrationNumber?: string;
  vehicleInsurance?: string;
  vehicleRegistrationCertificate?: string;
  vehiclePhotos?: string[];
}

export interface BikeRider {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: 'Approved' | 'Rejected';
  age?: number;
  address?: string;
  experience?: number;
  idProofs?: string[];
  vehicleType?: string;
  vehicleRegistrationNumber?: string;
  vehicleInsurance?: string;
  vehicleRegistrationCertificate?: string;
  vehiclePhotos?: string[];
}

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

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  bookingHistory?: (BusBooking | HotelBooking | TaxiBooking | BikeBooking)[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Subadmin' | 'Manager';
  permissions: string[];
  createdAt: string;
}

export interface Commission {
  id: string;
  serviceType: 'Bus' | 'Hotel' | 'Taxi' | 'Bike';
  percentage: number;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
}

export interface Coupon {
  id: string;
  name: string;
  code: string;
  serviceType: 'Bus' | 'Hotel' | 'Taxi' | 'Bike' | 'All';
  discountPercentage: number;
  expiryDate: string;
  isActive: boolean;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  userName: string;
  type: 'Credit' | 'Debit' | 'Transfer' | 'Withdrawal';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  recipientType: 'All' | 'Customers' | 'Drivers' | 'Riders' | 'Hotel Managers' | 'Bus Operators';
  sentAt: string;
  status: 'Sent' | 'Draft';
}
