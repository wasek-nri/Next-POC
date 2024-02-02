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
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'ItemNumber',
    headerName: 'Item Number',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'ItemType',
    headerName: 'Item Type',
    flex: 1,
    sortable: true,
    filterable: true,
  },
  {
    field: 'StyleDescription',
    headerName: 'Style Description',
    flex: 1,
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
      getRowId={(row) => row.ItemID}
      //   rowsPerPageOptions={[50]}
      // Include other DataGrid props as needed
    />
  );
};

export default InventoryItemsDG;
