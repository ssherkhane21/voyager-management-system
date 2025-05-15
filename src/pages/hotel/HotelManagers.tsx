
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/ui/DataTable';
import { HotelManager } from '@/types/admin';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';

// Mock data for hotel managers
const mockHotelManagers: HotelManager[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    mobile: "9876543210",
    email: "manager@grandplaza.com",
    status: "Approved",
    hotelName: "Grand Plaza Hotel",
    totalRooms: 120,
  },
  {
    id: "2",
    name: "Luxury Inn",
    mobile: "9876123450",
    email: "manager@luxuryinn.com",
    status: "Pending",
    hotelName: "Luxury Inn",
    totalRooms: 85,
  },
  {
    id: "3",
    name: "Sunset Resort",
    mobile: "8765432109",
    email: "manager@sunsetresort.com",
    status: "Submitted",
    hotelName: "Sunset Resort",
    totalRooms: 160,
  },
  {
    id: "4",
    name: "Mountain View",
    mobile: "7654321098",
    email: "manager@mountainview.com",
    status: "Rejected",
    hotelName: "Mountain View Hotel",
    totalRooms: 65,
  },
  {
    id: "5",
    name: "Urban Stay",
    mobile: "8901234567",
    email: "manager@urbanstay.com",
    status: "Blocked",
    hotelName: "Urban Stay Hotel",
    totalRooms: 45,
  }
];

const HotelManagers = () => {
  const navigate = useNavigate();
  const [managers] = useState<HotelManager[]>(mockHotelManagers);

  const handleRowClick = (manager: HotelManager) => {
    navigate(`/hotel-management/managers/${manager.id}`);
  };

  const columns = [
    { key: 'name' as keyof HotelManager, header: 'Name' },
    { key: 'mobile' as keyof HotelManager, header: 'Mobile' },
    { key: 'email' as keyof HotelManager, header: 'Email' },
    { 
      key: 'status' as keyof HotelManager, 
      header: 'Status',
      render: (manager: HotelManager) => <StatusBadge status={manager.status} />
    },
    { 
      key: 'actions' as 'actions', 
      header: 'Actions',
      render: (manager: HotelManager) => (
        <button 
          className="action-button flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/hotel-management/managers/${manager.id}`);
          }}
        >
          <Eye size={16} className="mr-1" /> View Details
        </button>
      )
    }
  ];

  const filterOptions = [
    {
      key: 'status' as keyof HotelManager,
      label: 'Status',
      options: [
        { label: 'Approved', value: 'Approved' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Blocked', value: 'Blocked' }
      ]
    }
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Managers</h1>
        <Button
          onClick={() => navigate('/hotel-management/managers/new')}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Hotel Manager
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={managers}
        onRowClick={handleRowClick}
        keyExtractor={(item) => item.id}
        filterable={true}
        filterOptions={filterOptions}
      />
    </Layout>
  );
};

export default HotelManagers;
