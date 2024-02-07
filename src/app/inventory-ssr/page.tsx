import React from 'react';
import InventoryItemsDGContainer from './container/InventoryItemsDGContainer';
import { fetchInventoryItems } from '../inventory/items/services/inventoryItems';

const InventoryItemsPage = async () => {
  //   const initialData = await fetchInventoryItems({
  //     page: 1,
  //     pageSize: 50,
  //     clientCode: '2XU',
  //   });
  //   console.log('initialData', initialData);

  return (
    <>
      <h1>Inventory Items - SSR</h1>
      <InventoryItemsDGContainer />
    </>
  );
};

export default InventoryItemsPage;
