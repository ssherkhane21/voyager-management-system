
// Admin related types (converted to JS objects/comments for reference)
/*
User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Subadmin' | 'Manager'
  permissions: string[]
  createdAt: string
}
*/

/*
ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
  }[]
}
*/

/*
BusOperator {
  id: string
  name: string
  email: string
  mobile?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  status: string ('active', 'inactive', 'pending', 'Approved', 'Rejected', 'Submitted', 'Blocked', 'Pending')
  numberOfBuses?: number
  busCount?: number
  joinDate?: string
  profilePhoto?: string
  idCardFront?: string
  idCardBack?: string
  businessLicense?: string
  bankName?: string
  bankAccountNumber?: string
  accountHolderName?: string
  bankAccountDetails?: string
}
*/

/*
Bus {
  id: string
  operatorId: string
  registrationNumber: string
  type: string
  capacity: number
  amenities?: string[]
  status: string ('active', 'inactive', 'maintenance')
  manufactureYear?: number
  lastMaintenance?: string
  insuranceValidTill?: string
  route?: string
}
*/

/*
HotelManager {
  id: string
  name: string
  email: string
  mobile?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  status: string
  roomCount?: number
  joinDate?: string
  profilePhoto?: string
  hotelName?: string
  businessLicense?: string
  hotelPhotos?: string[]
  locality?: string
  landmark?: string
  pinCode?: string
  totalRooms?: number
  standardRooms?: object
  luxuryRooms?: object
  checkInTime?: string
  checkOutTime?: string
  amenities?: string[]
  policyDocuments?: string
  bankAccountNumber?: string
  bankAccountDetails?: string
  idCardFront?: string
  idCardBack?: string
}
*/

/*
TaxiDriver {
  id: string
  name: string
  email: string
  mobile?: string
  phone?: string
  licenseNumber?: string
  vehicleNumber?: string
  vehicleType?: string
  city?: string
  status: string
  joinDate?: string
  age?: number
  address?: string
  experience?: number
  idProofs?: string[]
  vehicleRegistrationNumber?: string
  vehicleInsurance?: string
  vehicleRegistrationCertificate?: string
  vehiclePhotos?: string[]
}
*/

/*
BikeRider {
  id: string
  name: string
  email: string
  mobile?: string
  phone?: string
  licenseNumber?: string
  bikeNumber?: string
  bikeModel?: string
  vehicleType?: string
  vehicleRegistrationNumber?: string
  vehicleInsurance?: string
  vehicleRegistrationCertificate?: string
  vehiclePhotos?: string[]
  city?: string
  status: string
  joinDate?: string
  age?: number
  address?: string
  experience?: number
  idProofs?: string[]
}
*/

// This file now serves as documentation for the shape of objects used throughout the application
// Since JavaScript doesn't have types, we've converted this to comments for reference purposes

