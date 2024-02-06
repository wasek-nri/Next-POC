// 'use client';
import React from 'react';
import InventoryItemsDGContainer from './container/InventoryItemsDGContainer';
import { fetchInventoryItems } from '../inventory/items/services/inventoryItems';

// async function getPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   return res.json();
// }

// // // Assuming this endpoint and headers match your actual API requirements
// const API_ENDPOINT = 'http://localhost:3000/web/inventory/items';
// const headers = {
//   Accept: 'application/json, text/plain, */*',
//   'Accept-Language': 'en-US,en;q=0.9',
//   CompanyID: '1',
//   Cookie:
//     'authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4OTkwYmE2YzYxMTZhMGE4MmQ2NzAiLCJpYXQiOjE3MDcxODkwMTUsImV4cCI6MTcwNzIyNTAxNX0.zXfbEv5hTjgWE6tgVjAM8ZVVfMttRzPfWdTo4dptbQ0',
//   // Include other headers as needed, like authorization if required
// };

// const queryParams = new URLSearchParams({
//   page: '1',
//   pageSize: '50',
//   'filters[0].column': 'ClientCode',
//   'filters[0].value': '2XU',
//   'filters[0].comparison': 'Equal',
//   'sort.column': 'ItemNumber',
//   'sort.directionString': 'ASC',
//   validateOnLoad: 'true',
// });

// const getInventoryItems = async () => {
//   try {
//     const response = await fetch(`${API_ENDPOINT}?${queryParams.toString()}`, {
//       method: 'GET',
//       headers: headers,
//     });

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! status: ${response.status}`);
//     // }
//     console.log('response', response);

//     const data = response.json();
//     return data;
//   } catch (error) {
//     console.error('Failed to fetch inventory items:', error);
//     throw error;
//   }
// };

const InventoryItemsPage = async () => {
  const initialData = await fetchInventoryItems({
    page: 1,
    pageSize: 50,
    clientCode: '2XU',
  });
  console.log('initialData', initialData);
  //   const data = await getPosts();

  //   console.log('hello,', data);
  //   getInventoryItems().then((data) => console.log(data));

  //   console.log(
  //     fetchInventoryItems({
  //       page: 1,
  //       pageSize: 20,
  //       clientCode: '2XU',
  //     })
  //   );
  return (
    <>
      <h1>Inventory Items - Hybrid</h1>

      <InventoryItemsDGContainer initialData={initialData} />
    </>
  );
};

export default InventoryItemsPage;
