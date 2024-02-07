'use client';
import LoadingLines from '@/common/ui/components/LoadingLines';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import {
  InventoryItem,
  InventoryItemsDGProps,
  InventoryItemsResponse,
} from '../interfaces/inventoryItems';
import { fetchInventoryItems } from '../services/inventoryItems';
import InventoryItemsDG from '../components/InventoryItemsDG';

// Dynamically import InventoryItemsDG with SSR disabled
// const InventoryItemsDG = dynamic(
//   () => import('../components/InventoryItemsDG'),
//   {
//     ssr: false,
//     loading: () => <LoadingLines />,
//   }
// );

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

const InventoryItemsPage: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: INITIAL_PAGE_SIZE,
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [rowCountState, setRowCountState] = useState<number | undefined>(
    undefined
  );
  const [rows, setRows] = useState<InventoryItem[]>([]);
  // Initialize preFetchedPages to track pages for which data has been prefetched
  const [preFetchedPages, setPreFetchedPages] = useState<
    Record<string, boolean>
  >({});

  const fetchKey = `/inventory/items?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`;

  const { data, error } = useSWR<InventoryItemsResponse>(
    fetchKey,
    () =>
      fetchInventoryItems({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        clientCode: '2XU',
      }),
    {
      revalidateOnFocus: false,
    }
  );

  //   // Prefetching next page data. Don't prefetch if we've already prefetched the next page
  //   useEffect(() => {
  //     const nextPage = paginationModel.page + 1;
  //     const pageSize = paginationModel.pageSize;
  //     const key = `page=${nextPage}&pageSize=${pageSize}`;
  //     // Prefetch only if we haven't already prefetched the next page with the same pageSize
  //     if (!preFetchedPages[key]) {
  //       setPreFetchedPages((prev) => ({ ...prev, [key]: true }));

  //       const nextFetchKey = `/inventory/items?${key}`;
  //       mutate(
  //         nextFetchKey,
  //         fetchInventoryItems({
  //           page: nextPage,
  //           pageSize,
  //           clientCode: '2XU',
  //         })
  //       );
  //     }
  //   }, [paginationModel, preFetchedPages]);

  useEffect(() => {
    // if (!data) return; // Ensure current page data is loaded before prefetching next page

    const nextPage = paginationModel.page + 1;
    const pageSize = paginationModel.pageSize;
    const key = `page=${nextPage}&pageSize=${pageSize}`;
    // Prefetch only if we haven't already prefetched the next page with the same pageSize
    if (!preFetchedPages[key]) {
      setPreFetchedPages((prev) => ({ ...prev, [key]: true }));
      const nextFetchKey = `/inventory/items?${key}`;
      mutate(
        nextFetchKey,
        fetchInventoryItems({
          page: nextPage,
          pageSize,
          clientCode: '2XU',
        })
      ).catch(console.error); // Adding catch to handle possible errors
    }
  }, [paginationModel, preFetchedPages, data]); // Add `data` as a dependency to ensure prefetching occurs after data is loaded

  useEffect(() => {
    if (data) {
      setRows(data.Items);
      setRowCountState(data.Count);
      setIsInitialLoading(false);
    } else if (error) {
      setIsInitialLoading(false);
    }
  }, [data, error]);

  if (isInitialLoading) {
    return <LoadingLines />;
  }

  console.log('preFetchedPages', preFetchedPages);

  const isLoading = !data && !error;

  return (
    <>
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
        onPaginationModelChange={(newModel) => {
          setPaginationModel({
            page: newModel.page + 1,
            pageSize: newModel.pageSize,
          });
        }}
        pagination
      />
    </>
  );
};

export default InventoryItemsPage;
