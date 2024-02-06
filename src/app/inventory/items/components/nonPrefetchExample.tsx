'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { columns } from '../containers/InventoryItemsDGContainer';
import {
  InventoryItem,
  InventoryItemsResponse,
} from '../interfaces/inventoryItems';
import { fetchInventoryItems } from '../services/inventoryItems';
import InventoryItemsDG from './InventoryItemsDG';

const INITIAL_PAGE_SIZE = 50;

const InventoryItemsPage: React.FC = () => {
  // State for pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  // State to track initial loading
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // State for row count, managing it to keep consistent pagination
  const [rowCountState, setRowCountState] = useState<number | undefined>(
    undefined
  );

  // State for managing rows; keeps previous data visible until new data loads
  const [rows, setRows] = useState<InventoryItem[]>([]);

  // Use SWR for data fetching
  const { data, error } = useSWR<InventoryItemsResponse>(
    [`/inventory/items`, paginationModel.page, paginationModel.pageSize],
    () =>
      fetchInventoryItems({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        clientCode: '2XU',
      })
  );

  // Effect to handle data loading and error handling
  useEffect(() => {
    if (data) {
      // Update rows only when data is successfully fetched
      setRows(data.Items);
      setRowCountState(data.Count);
      setIsInitialLoading(false);
    } else if (error) {
      setIsInitialLoading(false);
      // Handle error state appropriately (e.g., show an error message)
    }
  }, [data, error]);

  // Display a loading indicator or skeleton on initial load
  if (isInitialLoading) {
    return <div>Loading...</div>;
  }

  // Determine if data is currently loading (after initial load)
  const isLoading = !data && !error;

  return (
    <div>
      <h1>Inventory Items</h1>
      <InventoryItemsDG
        rows={rows} // Use stateful rows to keep previous data visible
        columns={columns}
        rowCount={rowCountState}
        loading={isLoading} // Shows spinner on top of existing rows
        pageSizeOptions={[5, 20, 50]}
        paginationModel={{
          page: paginationModel.page - 1,
          pageSize: paginationModel.pageSize,
        }}
        paginationMode="server"
        onPaginationModelChange={(newModel) => {
          setPaginationModel({
            page: newModel.page + 1,
            pageSize: newModel.pageSize,
          });
        }}
        pagination
      />
    </div>
  );
};

export default InventoryItemsPage;
