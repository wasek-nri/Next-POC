import React from 'react';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { fetchInventoryItems } from '@/app/inventory/items/services/inventoryItems';
import { columns } from '@/app/inventory/items/containers/InventoryItemsDGContainer';
import { InventoryItem } from '@/app/inventory/items/interfaces/inventoryItems';

const INITIAL_PAGE_SIZE = 50;

const InventoryItemsDGContainer: React.FC = async () => {
  // Define columns for the DataGrid
  const columns = [
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
  const initialData = await fetchInventoryItems({
    page: 1,
    pageSize: INITIAL_PAGE_SIZE,
    clientCode: '2XU',
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {initialData.Items.map((item) => (
            <tr key={item.ItemID}>
              {columns.map((column) => (
                <td key={`${item.ItemID}-${column.field}`}>
                  {item[column.field as keyof InventoryItem]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InventoryItemsDGContainer;
