'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import InventoryItemsDG, { columns } from './components/InventoryItemsDG';
import {
  InventoryItem,
  InventoryItemsResponse,
} from './interfaces/inventoryItems';
import { fetchInventoryItems } from './services/inventoryItems';

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
  //   const [visitedPages, setVisitedPages] = useState<{ [page: number]: boolean }>(
  //     {}
  //   );
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
    return <div>Loading...</div>;
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
