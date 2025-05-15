
import { useState } from 'react';
import { Plus, Percent } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/ui/DataTable';
import { Commission } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

// Mock data for commissions
const mockCommissions: Commission[] = [
  {
    id: "1",
    serviceType: "Bus",
    percentage: 10,
    effectiveFrom: "2023-01-01",
    isActive: true
  },
  {
    id: "2",
    serviceType: "Hotel",
    percentage: 12,
    effectiveFrom: "2023-01-01",
    isActive: true
  },
  {
    id: "3",
    serviceType: "Taxi",
    percentage: 15,
    effectiveFrom: "2023-01-01",
    isActive: true
  },
  {
    id: "4",
    serviceType: "Bike",
    percentage: 8,
    effectiveFrom: "2023-01-01",
    isActive: true
  }
];

const CommissionManagement = () => {
  const [commissions, setCommissions] = useState<Commission[]>(mockCommissions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCommission, setCurrentCommission] = useState<Commission>({
    id: '',
    serviceType: 'Bus',
    percentage: 0,
    effectiveFrom: new Date().toISOString().split('T')[0],
    isActive: true
  });

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentCommission({
      id: Date.now().toString(),
      serviceType: 'Bus',
      percentage: 0,
      effectiveFrom: new Date().toISOString().split('T')[0],
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const handleEditCommission = (commission: Commission) => {
    setIsEditing(true);
    setCurrentCommission({ ...commission });
    setIsDialogOpen(true);
  };

  const handleInputChange = (field: keyof Commission, value: any) => {
    setCurrentCommission(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCommission = () => {
    if (isEditing) {
      setCommissions(prev => prev.map(item => item.id === currentCommission.id ? currentCommission : item));
      toast({
        title: "Commission Updated",
        description: `${currentCommission.serviceType} commission updated to ${currentCommission.percentage}%`,
      });
    } else {
      setCommissions(prev => [...prev, currentCommission]);
      toast({
        title: "Commission Added",
        description: `New ${currentCommission.serviceType} commission added at ${currentCommission.percentage}%`,
      });
    }
    setIsDialogOpen(false);
  };

  const toggleCommissionStatus = (id: string) => {
    setCommissions(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isActive: !item.isActive } 
          : item
      )
    );

    const commission = commissions.find(c => c.id === id);
    if (commission) {
      toast({
        title: commission.isActive ? "Commission Deactivated" : "Commission Activated",
        description: `${commission.serviceType} commission has been ${commission.isActive ? 'deactivated' : 'activated'}.`,
      });
    }
  };

  const columns = [
    { key: 'serviceType' as keyof Commission, header: 'Service Type' },
    { 
      key: 'percentage' as keyof Commission, 
      header: 'Percentage',
      render: (commission: Commission) => <span>{commission.percentage}%</span>
    },
    { key: 'effectiveFrom' as keyof Commission, header: 'Effective From' },
    { 
      key: 'isActive' as keyof Commission, 
      header: 'Status',
      render: (commission: Commission) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${commission.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {commission.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      key: 'actions' as 'actions', 
      header: 'Actions',
      render: (commission: Commission) => (
        <div className="flex items-center space-x-2">
          <button 
            className="action-button"
            onClick={() => handleEditCommission(commission)}
          >
            Edit
          </button>
          <button 
            className={`action-button ${commission.isActive ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
            onClick={() => toggleCommissionStatus(commission.id)}
          >
            {commission.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      )
    }
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Commission Management</h1>
        <Button
          onClick={handleAddNew}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add New Commission
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={commissions}
        keyExtractor={(item) => item.id}
        searchable={false}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Commission' : 'Add New Commission'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <Select
                value={currentCommission.serviceType}
                onValueChange={(value: any) => handleInputChange('serviceType', value)}
                disabled={isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bus">Bus</SelectItem>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Taxi">Taxi</SelectItem>
                  <SelectItem value="Bike">Bike</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Commission Percentage</label>
              <div className="relative">
                <Input
                  type="number"
                  value={currentCommission.percentage}
                  onChange={(e) => handleInputChange('percentage', parseFloat(e.target.value) || 0)}
                  className="pr-8"
                  min={0}
                  max={100}
                />
                <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Effective From</label>
              <Input
                type="date"
                value={currentCommission.effectiveFrom}
                onChange={(e) => handleInputChange('effectiveFrom', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={currentCommission.isActive ? "active" : "inactive"}
                onValueChange={(value) => handleInputChange('isActive', value === "active")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCommission}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CommissionManagement;
