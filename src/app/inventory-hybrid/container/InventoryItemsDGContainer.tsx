'use client';
import LoadingLines from '@/common/ui/components/LoadingLines';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import {
  InventoryItem,
  InventoryItemsDGProps,
  InventoryItemsResponse,
} from '../../inventory/items/interfaces/inventoryItems';
import { fetchInventoryItems } from '../../inventory/items/services/inventoryItems';

// Dynamically import InventoryItemsDG with SSR disabled
const InventoryItemsDG = dynamic(
  () => import('../../inventory/items/components/InventoryItemsDG'),
  {
    // ssr: false,
    loading: () => <LoadingLines />,
  }
);

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

const INITIAL_PAGE_SIZE = 50;

// const InventoryItemsDGContainer: React.FC<{
//   initialData: InventoryItemsResponse;
// }> = ({ initialData }) => {
//   const [paginationModel, setPaginationModel] = useState({
//     page: 1,
//     pageSize: INITIAL_PAGE_SIZE,
//   });
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [rowCountState, setRowCountState] = useState(initialData?.Count);
//   const [rows, setRows] = useState<InventoryItem[]>(initialData?.Items || []);
//   // Initialize preFetchedPages to track pages for which data has been prefetched
//   const [preFetchedPages, setPreFetchedPages] = useState<
//     Record<string, boolean>
//   >({});
//   // Use a state to manage when to trigger SWR fetching
//   const [shouldFetch, setShouldFetch] = useState(false);

//   const fetchKey = `/inventory/items?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&clientCode=2XU`;

//   const { data, error } = useSWR<InventoryItemsResponse>(
//     shouldFetch ? fetchKey : null,
//     () =>
//       fetchInventoryItems({
//         page: paginationModel.page,
//         pageSize: paginationModel.pageSize,
//         clientCode: '2XU',
//       }),
//     {
//       fallbackData: paginationModel.page === 1 ? initialData : undefined,
//       revalidateOnFocus: false,
//     }
//   );

//   useEffect(() => {
//     // Prefetching next page data
//     const nextPage = paginationModel.page + 1;
//     const key = `page=${nextPage}&pageSize=${paginationModel.pageSize}`;
//     if (!preFetchedPages[key]) {
//       setPreFetchedPages((prev) => ({ ...prev, [key]: true }));
//       const nextFetchKey = `/inventory/items?page=${nextPage}&pageSize=${paginationModel.pageSize}&clientCode=2XU`;
//       mutate(
//         nextFetchKey,
//         fetchInventoryItems({
//           page: nextPage,
//           pageSize: paginationModel.pageSize,
//           clientCode: '2XU',
//         })
//       ).catch(console.error); // Handle errors gracefully
//     }
//   }, [paginationModel, preFetchedPages]);

//   useEffect(() => {
//     if (data) {
//       setRows(data.Items);
//       setRowCountState(data.Count);
//       setIsInitialLoading(false);
//     } else if (error) {
//       console.error(error);
//       setIsInitialLoading(false);
//       // Optionally, handle the error state with a user-friendly message
//     }
//   }, [data, error]);

//   useEffect(() => {
//     // This effect ensures SWR fetching starts only after initialData is used for the first page
//     if (paginationModel.page > 1 && !shouldFetch) {
//       setShouldFetch(true);
//     }
//   }, [paginationModel.page, shouldFetch]);

//   if (isInitialLoading) {
//     return <LoadingLines />;
//   }

//   return (
//     <InventoryItemsDG
//       rows={rows}
//       columns={columns}
//       rowCount={rowCountState}
//       loading={!data && !error}
//       pageSizeOptions={[5, 20, 50]}
//       paginationModel={{
//         page: paginationModel.page - 1, // Adjust according to your Data Grid's expected model
//         pageSize: paginationModel.pageSize,
//       }}
//       paginationMode="server"
//       onPaginationModelChange={(newModel) => {
//         setPaginationModel({
//           page: newModel.page + 1, // Adjust based on your Data Grid's pagination model
//           pageSize: newModel.pageSize,
//         });
//       }}
//       pagination
//     />
//   );
// };

// export default InventoryItemsDGContainer;

const InventoryItemsDGContainer: React.FC<{
  initialData: InventoryItemsResponse;
}> = ({ initialData }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: initialData.PageNumber,
    pageSize: INITIAL_PAGE_SIZE,
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [preFetchedPages, setPreFetchedPages] = useState<
    Record<string, boolean>
  >({});
  const [rows, setRows] = useState<InventoryItem[]>(initialData?.Items || []);
  const [rowCountState, setRowCountState] = useState<number>(
    initialData?.Count
  );

  const fetchKey = `/inventory/items?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&clientCode=2XU`;

  const { data, error } = useSWR<InventoryItemsResponse>(
    initialData.PageNumber > 1 || !isInitialLoading ? fetchKey : null,
    () =>
      fetchInventoryItems({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        clientCode: '2XU',
      }),
    {
      fallbackData:
        isInitialLoading && initialData.PageNumber === 1
          ? initialData
          : undefined,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    // Handle data updates from SWR or initialData
    if (data) {
      setRows(data.Items);
      setRowCountState(data.Count);
      setIsInitialLoading(false); // Ensure loading state is updated
    }
  }, [data]);

  useEffect(() => {
    // Prefetching next page data
    const nextPage = paginationModel.page + 1;
    const key = `page=${nextPage}&pageSize=${paginationModel.pageSize}`;
    if (!preFetchedPages[key]) {
      setPreFetchedPages((prev) => ({ ...prev, [key]: true }));
      mutate(
        `/inventory/items?page=${nextPage}&pageSize=${paginationModel.pageSize}&clientCode=2XU`,
        fetchInventoryItems({
          page: nextPage,
          pageSize: paginationModel.pageSize,
          clientCode: '2XU',
        })
      ).catch(console.error); // Handle prefetch errors
    }
  }, [paginationModel, preFetchedPages]);

  // Update pagination model based on user interaction or other logic
  const handlePaginationModelChange = (
    newPage: number,
    newPageSize: number
  ) => {
    setIsInitialLoading(paginationModel.page === 1); // Re-fetch data when page size changes on the first page
    setPaginationModel({ page: newPage, pageSize: newPageSize });
  };

  if (isInitialLoading && initialData.PageNumber === 1) {
    return <LoadingLines />;
  }

  const isLoading =
    !data &&
    !error &&
    paginationModel.page !== initialData.PageNumber &&
    paginationModel.pageSize !== initialData.PageSize;

  return (
    <InventoryItemsDG
      rows={rows}
      columns={columns}
      rowCount={rowCountState}
      loading={isLoading}
      pageSizeOptions={[5, 20, 50]}
      paginationModel={{
        page: paginationModel.page - 1,
        pageSize: paginationModel.pageSize,
      }}
      paginationMode="server"
      onPaginationModelChange={({ page, pageSize }) =>
        handlePaginationModelChange(page + 1, pageSize)
      }
      pagination
    />
  );
};

export default InventoryItemsDGContainer;
