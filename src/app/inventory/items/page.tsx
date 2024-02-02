'use client';
import React from 'react';
import useSWR from 'swr';
import InventoryItemsDG, { columns } from './components/InventoryItemsDG';
import { fetchInventoryItems } from './services/inventoryItems';

// const inventoryItems: InventoryItem[] = [
//   // Your inventory items data here
//   { id: 1, name: 'Item 1', stock: 10, price: 100 },
//   { id: 2, name: 'Item 2', stock: 20, price: 200 },
//   // ... more items
// ];

// const columns: InventoryItemsColumns = [
//   // Your columns definition here
//   { field: 'id', headerName: 'ID', width: 90 },
//   { field: 'name', headerName: 'Name', width: 150 },
//   { field: 'stock', headerName: 'Stock', type: 'number', width: 110 },
//   { field: 'price', headerName: 'Price', type: 'number', width: 130 },
//   // ... more columns
// ];

const InventoryItemsPage: React.FC = () => {
  //   const { data, error } = useSWR(
  //     ['/inventory/items', { page: 1, pageSize: 50, clientCode: '2XU' }],
  //     fetchInventoryItems
  //   );
  const { data, error } = useSWR(
    'inventory-items', // This is the cache key for SWR
    () => fetchInventoryItems({ page: 1, pageSize: 50, clientCode: '2XU' }) // Your fetch function
  );

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Inventory Items</h1>
      <InventoryItemsDG rows={data.Items} columns={columns} />
    </div>
  );
};

export default InventoryItemsPage;
