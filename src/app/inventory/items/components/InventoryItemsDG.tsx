'use client';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import * as React from 'react';
import {
  InventoryItem,
  InventoryItemsColumns,
} from '../interfaces/inventoryItems';

interface InventoryItemsDGProps {
  rows: InventoryItem[];
  columns: InventoryItemsColumns;
}

// Define columns for the DataGrid
export const columns: InventoryItemsDGProps['columns'] = [
  {
    field: 'Description',
    headerName: 'Description',
    width: 200,
    sortable: true,
    filterable: true,
  },
  {
    field: 'ItemNumber',
    headerName: 'Item Number',
    width: 150,
    sortable: true,
    filterable: true,
  },
  {
    field: 'ItemType',
    headerName: 'Item Type',
    width: 120,
    sortable: true,
    filterable: true,
  },
  {
    field: 'StyleDescription',
    headerName: 'Style Description',
    width: 180,
    sortable: true,
    filterable: true,
  },
  // Add more columns as needed
];

const InventoryItemsDG: React.FC<InventoryItemsDGProps> = ({
  rows,
  columns,
}) => {
  return (
    <DataGridPremium
      rows={rows}
      columns={columns}
      pageSizeOptions={[50, 100]}
      //   rowsPerPageOptions={[50]}
      // Include other DataGrid props as needed
    />
  );
};

export default InventoryItemsDG;
