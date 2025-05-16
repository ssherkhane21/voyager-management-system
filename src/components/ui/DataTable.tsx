
import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;  // Changed from 'keyof T | 'actions'' to allow any string
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface FilterOption<T> {
  key: keyof T | string;
  label: string;
  options: { label: string; value: string }[];
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string;
  searchable?: boolean;
  exportable?: boolean;
  filterable?: boolean;
  filterOptions?: FilterOption<T>[];
}

function DataTable<T>({
  columns,
  data,
  onRowClick,
  keyExtractor,
  searchable = true,
  exportable = true,
  filterable = true,
  filterOptions = []
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter data based on search term and filters
  const filteredData = data.filter(item => {
    // Check if the item matches the search term
    const matchesSearch = !searchTerm || Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Check if the item matches all selected filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      // Handle the case where key might not be a keyof T
      const itemValue = item[key as keyof T];
      return itemValue !== undefined 
        ? String(itemValue).toLowerCase() === value.toLowerCase()
        : true;
    });
    
    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const exportData = () => {
    console.log('Exporting data');
    // Implement export functionality
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header with Search and Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Data Table</h2>
          <span className="text-sm text-gray-500">({filteredData.length} items)</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          {searchable && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="text-gray-500" size={16} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input pl-10 w-full md:w-auto"
                placeholder="Search..."
              />
            </div>
          )}
          
          <div className="flex gap-2">
            {filterable && filterOptions.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                <Filter size={16} className="mr-1" />
                Filters
              </button>
            )}
            
            {exportable && (
              <button
                onClick={exportData}
                className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                <Download size={16} className="mr-1" />
                Export
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Filters Section */}
      {showFilters && filterable && filterOptions.length > 0 && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            {filterOptions.map((option) => (
              <div key={String(option.key)} className="flex flex-col">
                <label className="text-xs mb-1 text-gray-600">{option.label}</label>
                <select
                  value={filters[String(option.key)] || ''}
                  onChange={(e) => handleFilterChange(String(option.key), e.target.value)}
                  className="filter-select"
                >
                  <option value="">All</option>
                  {option.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-100 mt-4 md:mt-0"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`${column.width ? column.width : ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? 'cursor-pointer' : ''}
                >
                  {columns.map((column) => (
                    <td key={`${keyExtractor(item)}-${String(column.key)}`}>
                      {column.render
                        ? column.render(item)
                        : column.key !== 'actions' && typeof column.key === 'string' && column.key in item
                        ? String(item[column.key as keyof T])
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
