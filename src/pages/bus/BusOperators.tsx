
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { Plus, Eye } from 'lucide-react';
import { busOperators } from '@/data/mockData';
import { BusOperator } from '@/types/admin';

const BusOperators = () => {
  const navigate = useNavigate();
  
  const columns = [
    { key: 'name' as keyof BusOperator, header: 'Name' },
    { key: 'mobile' as keyof BusOperator, header: 'Mobile' },
    { key: 'email' as keyof BusOperator, header: 'Email ID' },
    { 
      key: 'status' as keyof BusOperator, 
      header: 'Status',
      render: (operator: BusOperator) => <StatusBadge status={operator.status} />
    },
    { 
      key: 'numberOfBuses' as keyof BusOperator, 
      header: 'Number of Buses',
      render: (operator: BusOperator) => (
        <span className="cursor-pointer text-blue-600 hover:underline">
          {operator.numberOfBuses}
        </span>
      )
    },
    { 
      key: 'actions' as 'actions', 
      header: 'Actions',
      render: (operator: BusOperator) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/bus-management/operators/${operator.id}`);
          }}
          className="action-button flex items-center"
        >
          <Eye size={16} className="mr-1" />
          View Details
        </button>
      )
    }
  ];

  const filterOptions = [
    {
      key: 'status' as keyof BusOperator,
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

  const handleRowClick = (operator: BusOperator) => {
    navigate(`/bus-management/operators/${operator.id}`);
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Bus Operators</h1>
          <p className="text-gray-600">Manage all bus operators</p>
        </div>
        
        <button 
          onClick={() => navigate('/bus-management/operators/new')}
          className="add-button"
        >
          <Plus size={18} />
          Add Bus Operator
        </button>
      </div>

      <DataTable
        columns={columns}
        data={busOperators}
        keyExtractor={(item) => item.id}
        onRowClick={handleRowClick}
        filterOptions={filterOptions}
      />
    </Layout>
  );
};

export default BusOperators;
