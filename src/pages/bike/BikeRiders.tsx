
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/ui/DataTable';
import { BikeRider } from '@/types/admin';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';

// Mock data for bike riders
const mockBikeRiders: BikeRider[] = [
  {
    id: "1",
    name: "Alex Johnson",
    mobile: "9876543210",
    email: "alex.j@example.com",
    status: "Approved",
    age: 28,
    experience: 5,
    vehicleType: "Scooter",
    vehicleRegistrationNumber: "TN-01-AB-5678"
  },
  {
    id: "2",
    name: "Sam Wilson",
    mobile: "8765432109",
    email: "sam.w@example.com",
    status: "Approved",
    age: 25,
    experience: 3,
    vehicleType: "MotorBike",
    vehicleRegistrationNumber: "TN-02-CD-9012"
  },
  {
    id: "3",
    name: "Ryan Thomas",
    mobile: "7654321098",
    email: "ryan.t@example.com",
    status: "Rejected",
    age: 22,
    experience: 1,
    vehicleType: "Scooter",
    vehicleRegistrationNumber: "TN-03-EF-3456"
  },
  {
    id: "4",
    name: "Jake Miller",
    mobile: "6543210987",
    email: "jake.m@example.com",
    status: "Approved",
    age: 30,
    experience: 7,
    vehicleType: "MotorBike",
    vehicleRegistrationNumber: "TN-04-GH-7890"
  }
];

const BikeRiders = () => {
  const navigate = useNavigate();
  const [riders] = useState<BikeRider[]>(mockBikeRiders);

  const handleRowClick = (rider: BikeRider) => {
    navigate(`/bike-management/riders/${rider.id}`);
  };

  const columns = [
    { key: 'name' as keyof BikeRider, header: 'Name' },
    { key: 'mobile' as keyof BikeRider, header: 'Mobile' },
    { key: 'email' as keyof BikeRider, header: 'Email' },
    { key: 'vehicleType' as keyof BikeRider, header: 'Vehicle Type' },
    { key: 'vehicleRegistrationNumber' as keyof BikeRider, header: 'Registration Number' },
    { 
      key: 'status' as keyof BikeRider, 
      header: 'Status',
      render: (rider: BikeRider) => <StatusBadge status={rider.status} />
    },
    { 
      key: 'actions' as 'actions', 
      header: 'Actions',
      render: (rider: BikeRider) => (
        <button 
          className="action-button flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/bike-management/riders/${rider.id}`);
          }}
        >
          <Eye size={16} className="mr-1" /> View Details
        </button>
      )
    }
  ];

  const filterOptions = [
    {
      key: 'status' as keyof BikeRider,
      label: 'Status',
      options: [
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
      ]
    },
    {
      key: 'vehicleType' as keyof BikeRider,
      label: 'Vehicle Type',
      options: [
        { label: 'Scooter', value: 'Scooter' },
        { label: 'MotorBike', value: 'MotorBike' }
      ]
    }
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bike Riders</h1>
        <Button
          onClick={() => navigate('/bike-management/riders/new')}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Bike Rider
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={riders}
        onRowClick={handleRowClick}
        keyExtractor={(item) => item.id}
        filterable={true}
        filterOptions={filterOptions}
      />
    </Layout>
  );
};

export default BikeRiders;
