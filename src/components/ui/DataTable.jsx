
import { useState, useMemo } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationLink 
} from '@/components/ui/pagination';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  keyExtractor,
  onRowClick,
  filterable = true,
  filterOptions = [],
  paginate = true,
  pageSize = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});

  // Sorting function
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (typeof aValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === 'asc' 
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle search and filtering
  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      // Check search term
      if (searchTerm) {
        const searchMatch = columns.some(column => {
          const value = item[column.key];
          return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
        if (!searchMatch) return false;
      }

      // Check filters
      for (const key in filters) {
        if (filters[key] && item[key] !== filters[key]) {
          return false;
        }
      }

      return true;
    });
  }, [sortedData, searchTerm, filters, columns]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!paginate) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, paginate]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? null : value
    }));
    setCurrentPage(1);
  };

  // Generate page links
  const getPageLinks = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex flex-wrap gap-4 justify-between">
        {filterable && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        {filterOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(filter => (
              <select
                key={filter.key}
                className="px-3 py-2 border rounded-md text-sm"
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                value={filters[filter.key] || ''}
              >
                <option value="">{filter.label}: All</option>
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  className={column.key !== 'actions' ? 'cursor-pointer' : ''}
                  onClick={() => {
                    if (column.key !== 'actions') {
                      requestSort(column.key);
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortConfig.key === column.key && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="h-4 w-4" />
                        : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow 
                  key={keyExtractor(item)} 
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-100" : ""}
                >
                  {columns.map((column) => (
                    <TableCell key={`${keyExtractor(item)}-${column.key}`}>
                      {column.render 
                        ? column.render(item)
                        : item[column.key] !== undefined 
                          ? String(item[column.key]) 
                          : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginate && totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {getPageLinks().map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DataTable;
