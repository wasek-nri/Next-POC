import axios from 'axios';
import { InventoryItemsResponse } from '../interfaces/inventoryItems';

interface FetchInventoryItemsParams {
    page: number;
    pageSize: number;
    clientCode: string; // Adding clientCode as a parameter
    sortColumn?: string;
    sortDirection?: 'ASC' | 'DESC';
  }

const nriAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'CompanyID': '1',
    'Cookie': 'authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4OTkwYmE2YzYxMTZhMGE4MmQ2NzAiLCJpYXQiOjE3MDcyNTI5MTUsImV4cCI6MTcwNzI4ODkxNX0.w7tIeuOdJcfD8cySwmmcBsGnq1cH_ncGGHZ4thDHkxA',
  },
  withCredentials: true, // This is required for cross-domain cookies to be sent
});

export const fetchInventoryItems =async({ 
    page, 
    pageSize, 
    clientCode, 
    sortColumn = 'ItemNumber',
    sortDirection = 'ASC'
  }: FetchInventoryItemsParams): Promise<InventoryItemsResponse> => {
    // Construct the query parameters based on the function arguments
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      'filters[0].column': 'ClientCode',
      'filters[0].value': clientCode, // Use the dynamic clientCode value
      'filters[0].comparison': 'Equal',
      'sort.column': sortColumn,
      'sort.directionString': sortDirection,
      'validateOnLoad': 'true',
    });
  
    // The actual URL will be: baseURL + '/web/inventory/items?' + queryParams.toString()
    // return nriAxios.get(`/web/inventory/items?${queryParams.toString()}`)
    // .then(response => response.data);
    const response = await nriAxios.get(`/web/inventory/items?${queryParams.toString()}`);
    return response.data;
  };

