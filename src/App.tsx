
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
            <Route path="/bus-management/bookings" element={<BusBookings />} />
            
            {/* Add more routes for other sections */}
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
