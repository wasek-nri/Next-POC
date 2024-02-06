'use client';
import { Box, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
// import InventoryItemsDG, { columns } from './components/InventoryItemsDG';
import dynamic from 'next/dynamic';
import { columns } from './components/InventoryItemsDG';
import {
  InventoryItem,
  InventoryItemsResponse,
} from './interfaces/inventoryItems';
import { fetchInventoryItems } from './services/inventoryItems';

// Dynamically import InventoryItemsDG with SSR disabled
const InventoryItemsDG = dynamic(
  () => import('./components/InventoryItemsDG'),
  {
    ssr: false,
  }
);

function CustomLoadingOverlay() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {Array.from(new Array(3)).map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          animation="wave"
          width="50%"
          //   height={60}
          style={{ marginBottom: 6 }}
        />
      ))}
    </Box>
  );
}

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

  const { data, error } = useSWR<InventoryItemsResponse>(fetchKey, () =>
    fetchInventoryItems({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      clientCode: '2XU',
    })
  );

  // Prefetching next page data. Don't prefetch if we've already prefetched the next page
  useEffect(() => {
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
      );
    }
  }, [paginationModel, preFetchedPages]);

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
    return <CustomLoadingOverlay />;
  }

  console.log('preFetchedPages', preFetchedPages);

  const isLoading = !data && !error;

  return (
    <div>
      <h1>Inventory Items</h1>
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
    </div>
  );
};

export default InventoryItemsPage;
