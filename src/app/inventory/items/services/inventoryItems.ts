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
  baseURL: 'https://gateway.test.aspiresuite.com',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'CompanyID': '1',
    'Connection': 'keep-alive',
    'Cookie': 'ARRAffinity=971882d557971c3372bd742d29c646e02116f2b8d9ba0766dc42b1327123f6f8; ARRAffinitySameSite=971882d557971c3372bd742d29c646e02116f2b8d9ba0766dc42b1327123f6f8; authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk1YjZkZTFhNTk4M2I3MmIxZTdmZjgiLCJpYXQiOjE3MDY4MTEyMDYsImV4cCI6MTcwNjg0NzIwNn0.Qbbx8losjaviLdDkKsdJ40D1jyMjCJkgNUbJGOc1fEQ; ARRAffinity=975e68d7348238685e42012d3f6cbc00234a5b18d5298412155d1333efcc22de; ARRAffinitySameSite=975e68d7348238685e42012d3f6cbc00234a5b18d5298412155d1333efcc22de',
    // ... other headers
  },
  withCredentials: true, // This is required for cross-domain cookies to be sent
});

export const fetchInventoryItems = ({ 
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
    return nriAxios.get(`/web/inventory/items?${queryParams.toString()}`)
    .then(response => response.data);
  };

