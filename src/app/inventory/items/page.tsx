// 'use client';
// import React, { useEffect, useState } from 'react';
// import useSWR from 'swr';
// import InventoryItemsDG, { columns } from './components/InventoryItemsDG';
// import { fetchInventoryItems } from './services/inventoryItems';

// const InventoryItemsPage: React.FC = () => {
//   //   const [page, setPage] = useState(1);
//   //   const [pageSize, setPageSize] = useState(50);

//   //   //   const { data, error } = useSWR(
//   //   //     'inventory-items', // This is the cache key for SWR
//   //   //     () => fetchInventoryItems({ page: 1, pageSize: 50, clientCode: '2XU' }) // Your fetch function
//   //   //   );
//   //   const { data, error, mutate } = useSWR(
//   //     [
//   //       `/inventory/items?page=${page}&pageSize=${pageSize}&clientCode=2XU`,
//   //       page,
//   //       pageSize,
//   //     ],
//   //     () => fetchInventoryItems({ page, pageSize, clientCode: '2XU' })
//   //   );

//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 50,
//   });

//   const { data, error } = useSWR(
//     `/inventory/items?page=${paginationModel.page + 1}&pageSize=${
//       paginationModel.pageSize
//     }&clientCode=2XU`,
//     () =>
//       fetchInventoryItems({
//         page: paginationModel.page + 1,
//         pageSize: paginationModel.pageSize,
//         clientCode: '2XU',
//       })
//   );

//   const [rowCountState, setRowCountState] = useState(data?.Count || 0);

//   useEffect(() => {
//     if (data?.Count !== undefined) {
//       setRowCountState(data.Count);
//     }
//   }, [data?.Count]);

//   // Update the pagination state and refetch data
//   //   const handlePageChange = (newPage: number) => {
//   //     setPage(newPage);
//   //     mutate();
//   //   };

//   //   const handlePageSizeChange = (newPageSize: number) => {
//   //     setPageSize(newPageSize);
//   //     mutate();
//   //   };

//   if (error) return <div>Error loading data.</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Inventory Items</h1>
//       {/* <InventoryItemsDG rows={data.Items} columns={columns}  /> */}
//       <InventoryItemsDG
//         rows={data.Items || []}
//         columns={columns}
//         rowCount={rowCountState}
//         loading={!data && !error} // Show loading overlay in the DataGrid when data is not available yet
//         pageSizeOptions={[25, 50, 100]}
//         paginationModel={paginationModel}
//         paginationMode="server"
//         onPaginationModelChange={(model) => setPaginationModel(model)}
//         pagination
//       />
//     </div>
//   );
// };

// export default InventoryItemsPage;

'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import InventoryItemsDG, { columns } from './components/InventoryItemsDG';
import { InventoryItem } from './interfaces/inventoryItems';
import { fetchInventoryItems } from './services/inventoryItems';

const INITIAL_PAGE_SIZE = 50;

const InventoryItemsPage: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: INITIAL_PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<InventoryItem[]>([]);
  const [rowCount, setRowCount] = useState(0);

  // Use SWR for the initial data load
  const { data, error } = useSWR(
    `/inventory/items?page=1&pageSize=50&clientCode=2XU`,
    () => fetchInventoryItems({ page: 1, pageSize: 50, clientCode: '2XU' })
  );

  // Load data directly for pagination changes, bypassing SWR after the initial load
  //   const loadData = useCallback(async () => {
  //     setLoading(true);
  //     const response = await fetchInventoryItems({
  //       page: paginationModel.page,
  //       pageSize: paginationModel.pageSize,
  //       clientCode: '2XU',
  //     });
  //     setRows(response.Items);
  //     setRowCount(response.Count);
  //     setLoading(false);
  //   }, [paginationModel.page, paginationModel.pageSize]);

  // Effect to load data on pagination model change
  //   useEffect(() => {
  //     console.log('paginationModel', paginationModel);
  //     if (
  //       paginationModel.page > 1 &&
  //       paginationModel.pageSize > INITIAL_PAGE_SIZE
  //     ) {
  //       // Avoid initial load via SWR
  //       loadData();
  //     }
  //   }, [
  //     paginationModel.page,
  //     paginationModel.pageSize,
  //     loadData,
  //     paginationModel,
  //   ]);
  useEffect(() => {
    console.log('paginationModel', paginationModel);
    const fetchData = async () => {
      // Adjusted condition based on your logic
      setLoading(true);
      const response = await fetchInventoryItems({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        clientCode: '2XU',
      });
      setRows(response.Items);
      setRowCount(response.Count);
      setLoading(false);
    };

    fetchData();
  }, [paginationModel]); // Removed unnecessary dependencies

  // Initialize rows and rowCount from SWR data on first load
  useEffect(() => {
    if (data && data.Items && data.Count) {
      setRows(data.Items);
      setRowCount(data.Count);
    }
  }, [data]);

  if (error) return <div>Error loading data.</div>;
  if (!data && !loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Inventory Items</h1>
      <InventoryItemsDG
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pageSizeOptions={[5, 20, 50]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pagination
      />
    </div>
  );
};

export default InventoryItemsPage;
