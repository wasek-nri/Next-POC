'use client';
import {
  DataGridPremium,
  DataGridPremiumProps,
} from '@mui/x-data-grid-premium';
import * as React from 'react';
import { InventoryItem } from '../interfaces/inventoryItems';

// interface InventoryItemsDGProps {
//   rows: InventoryItem[];
//   columns: InventoryItemsColumns;
// }
interface InventoryItemsDGProps extends DataGridPremiumProps<InventoryItem> {
  rows: InventoryItem[];
  columns: DataGridPremiumProps<InventoryItem>['columns'];
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
  ...otherProps // Capture the rest of the props
}) => {
  return (
    <DataGridPremium
      rows={rows}
      columns={columns}
      getRowId={(row) => row.ItemID}
      {...otherProps} // Spread the rest of the props here
    />
  );
};

export default InventoryItemsDG;
