'use client';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import * as React from 'react';
import { InventoryItemsDGProps } from '../interfaces/inventoryItems';

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
