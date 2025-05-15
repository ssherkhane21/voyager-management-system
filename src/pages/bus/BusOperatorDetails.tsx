
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import UploadField from '@/components/ui/UploadField';
import { ArrowLeft, Save } from 'lucide-react';
import { busOperators } from '@/data/mockData';
import { BusOperator } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

const BusOperatorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [operator, setOperator] = useState<BusOperator | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isNewOperator = id === 'new';
  const pageTitle = isNewOperator ? 'Add Bus Operator' : 'Edit Bus Operator';

  // Status options
  const statusOptions = ['Approved', 'Pending', 'Submitted', 'Rejected', 'Blocked'];

  useEffect(() => {
    if (isNewOperator) {
      setOperator({
        id: 'new',
        name: '',
        mobile: '',
        email: '',
        status: 'Pending',
        numberOfBuses: 0
      });
      setLoading(false);
      return;
    }

    // Fetch operator data
    const fetchedOperator = busOperators.find(op => op.id === id) || null;
    setOperator(fetchedOperator);
    setLoading(false);
  }, [id, isNewOperator]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (operator) {
      setOperator({
        ...operator,
        [name]: name === 'numberOfBuses' ? parseInt(value) : value
      });
    }
  };

  const handleFileChange = (fieldName: keyof BusOperator, file: File | null) => {
    if (operator) {
      setOperator({
        ...operator,
        [fieldName]: file ? URL.createObjectURL(file) : null
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic would go here
    toast({
      title: isNewOperator ? "Bus Operator Added" : "Bus Operator Updated",
      description: `${operator?.name} has been ${isNewOperator ? "added" : "updated"} successfully.`,
    });

    navigate('/bus-management/operators');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!operator) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-600 mb-4">Bus Operator not found</p>
          <button
            onClick={() => navigate('/bus-management/operators')}
            className="action-button"
          >
            Back to Bus Operators
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/bus-management/operators')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Bus Operators
        </button>
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="form-section col-span-full">
              <h2 className="form-section-title">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UploadField
                  label="Profile Photo"
                  value={operator.profilePhoto}
                  onChange={(file) => handleFileChange('profilePhoto', file)}
                />

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={operator.name}
                      onChange={handleInputChange}
                      className="filter-input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={operator.mobile}
                      onChange={handleInputChange}
                      className="filter-input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={operator.email}
                      onChange={handleInputChange}
                      className="filter-input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={operator.status}
                      onChange={handleInputChange}
                      className="filter-select w-full"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Buses</label>
                    <input
                      type="number"
                      name="numberOfBuses"
                      value={operator.numberOfBuses}
                      onChange={handleInputChange}
                      className="filter-input w-full"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="form-section col-span-full">
              <h2 className="form-section-title">Address</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={operator.address || ''}
                  onChange={(e) => setOperator({ ...operator, address: e.target.value })}
                  className="filter-input w-full h-24"
                />
              </div>
            </div>

            {/* Identity Verification */}
            <div className="form-section col-span-full">
              <h2 className="form-section-title">Identity Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UploadField
                  label="ID Card Front"
                  value={operator.idCardFront}
                  onChange={(file) => handleFileChange('idCardFront', file)}
                />

                <UploadField
                  label="ID Card Back"
                  value={operator.idCardBack}
                  onChange={(file) => handleFileChange('idCardBack', file)}
                />

                <UploadField
                  label="Business License"
                  value={operator.businessLicense}
                  onChange={(file) => handleFileChange('businessLicense', file)}
                />
              </div>
            </div>

            {/* Bank Details */}
            <div className="form-section col-span-full">
              <h2 className="form-section-title">Bank Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={operator.bankName || ''}
                    onChange={handleInputChange}
                    className="filter-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={operator.bankAccountNumber || ''}
                    onChange={handleInputChange}
                    className="filter-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={operator.accountHolderName || ''}
                    onChange={handleInputChange}
                    className="filter-input w-full"
                  />
                </div>

                <UploadField
                  label="Bank Account Details"
                  value={operator.bankAccountDetails}
                  onChange={(file) => handleFileChange('bankAccountDetails', file)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/bus-management/operators')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700"
            >
              <Save size={18} className="mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BusOperatorDetails;
