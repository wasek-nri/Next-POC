'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import InventoryItemsDG, { columns } from './components/InventoryItemsDG';
import { fetchInventoryItems } from './services/inventoryItems';

const InventoryItemsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  //   const { data, error } = useSWR(
  //     'inventory-items', // This is the cache key for SWR
  //     () => fetchInventoryItems({ page: 1, pageSize: 50, clientCode: '2XU' }) // Your fetch function
  //   );
  const { data, error, mutate } = useSWR(
    [
      `/inventory/items?page=${page}&pageSize=${pageSize}&clientCode=2XU`,
      page,
      pageSize,
    ],
    () => fetchInventoryItems({ page, pageSize, clientCode: '2XU' })
  );

  // Update the pagination state and refetch data
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    mutate();
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    mutate();
  };

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Inventory Items</h1>
      {/* <InventoryItemsDG rows={data.Items} columns={columns}  /> */}
      <InventoryItemsDG
        rows={data.Items || []}
        columns={columns}
        // page={page - 1} // DataGridPremium uses 0-based indexing for pages
        // pageSize={pageSize}
        // onPageChange={handlePageChange}
        // onPageSizeChange={handlePageSizeChange}
        // initialState={{
        //   pagination: { paginationModel: { pageSize, page } },
        // }}
        initialState={{
          pagination: { paginationModel: { pageSize, page } },
        }}
        pageSizeOptions={[25, 50, 100]}
        pagination // Enable pagination
        rowCount={data.Count} // Total row count for pagination
        paginationMode="server" // Enable server-side pagination
      />
    </div>
  );
};

export default InventoryItemsPage;
