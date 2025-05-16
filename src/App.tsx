import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/context/SidebarContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import BusOperators from "./pages/bus/BusOperators";
import BusOperatorDetails from "./pages/bus/BusOperatorDetails";
import BusBookings from "./pages/bus/BusBookings";
import BusBookingDetails from "./pages/bus/BusBookingDetails";
import BusList from "./pages/bus/BusList";

// Hotel Management
import HotelManagers from "./pages/hotel/HotelManagers";
import HotelManagerDetails from "./pages/hotel/HotelManagerDetails";
import HotelBookings from "./pages/hotel/HotelBookings";

// Taxi Management
import TaxiDrivers from "./pages/taxi/TaxiDrivers";
import TaxiDriverDetails from "./pages/taxi/TaxiDriverDetails";
import TaxiBookings from "./pages/taxi/TaxiBookings";

// Bike Management
import BikeRiders from "./pages/bike/BikeRiders";
import BikeRiderDetails from "./pages/bike/BikeRiderDetails";
import BikeBookings from "./pages/bike/BikeBookings";

// Customer Management
import CustomerManagement from "./pages/customers/CustomerManagement";
import CustomerDetails from "./pages/customers/CustomerDetails";

// User Management
import UserManagement from "./pages/users/UserManagement";
import UserDetails from "./pages/users/UserDetails";

// Commission, Coupons, Wallet
import CommissionManagement from "./pages/commission/CommissionManagement";
import Coupons from "./pages/coupons/Coupons";
import Wallet from "./pages/wallet/Wallet";

// New Pages
import NotificationsManagement from "./pages/notifications/NotificationsManagement";
import Settings from "./pages/settings/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Bus Management Routes */}
            <Route path="/bus-management/operators" element={<BusOperators />} />
            <Route path="/bus-management/operators/:id" element={<BusOperatorDetails />} />
            <Route path="/bus-management/operators/:operatorId/buses" element={<BusList />} />
            <Route path="/bus-management/bookings" element={<BusBookings />} />
            <Route path="/bus-management/bookings/:bookingId" element={<BusBookingDetails />} />
            
            {/* Hotel Management Routes */}
            <Route path="/hotel-management/managers" element={<HotelManagers />} />
            <Route path="/hotel-management/managers/:id" element={<HotelManagerDetails />} />
            <Route path="/hotel-management/bookings" element={<HotelBookings />} />
            
            {/* Taxi Management Routes */}
            <Route path="/taxi-management/drivers" element={<TaxiDrivers />} />
            <Route path="/taxi-management/drivers/:id" element={<TaxiDriverDetails />} />
            <Route path="/taxi-management/bookings" element={<TaxiBookings />} />
            
            {/* Bike Management Routes */}
            <Route path="/bike-management/riders" element={<BikeRiders />} />
            <Route path="/bike-management/riders/:id" element={<BikeRiderDetails />} />
            <Route path="/bike-management/bookings" element={<BikeBookings />} />
            
            {/* Customer Management Routes */}
            <Route path="/customer-management" element={<CustomerManagement />} />
            <Route path="/customer-management/:customerId" element={<CustomerDetails />} />
            
            {/* User Management Routes */}
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/user-management/:userId" element={<UserDetails />} />
            
            {/* Other Management Routes */}
            <Route path="/commission-management" element={<CommissionManagement />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/notifications" element={<NotificationsManagement />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
