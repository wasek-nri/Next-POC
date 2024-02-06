// types.ts
import { DataGridPremiumProps, GridColDef, GridRowsProp } from '@mui/x-data-grid-premium';

// Interface for a single inventory item
export interface InventoryItem {
    ItemID: string;
    ClientID: string;
    ItemNumber: string;
    ClientItemNumber: string;
    Description: string;
    CommodityID: string;
    ProductGroupID: string;
    ItemType: string;
    InventoryMethod: string;
    ItemStatus: string;
    StatusDate: string;
    StyleCode: string;
    StyleDescription: string;
    ColourCode: string;
    ColourDescription: string;
    SizeCode: string;
    SizeDescription: string;
    SeasonCode: string;
    SeasonDescription: string;
    ManufacturerItemNumber: string;
    DangerousGood: boolean;
    BaseUomID: string;
    BaseUomDescription: string;
    ClientDivisionID: string;
    Division: string;
    GTIN: string;
    BackOrderable: boolean;
    ManufacturerName: string;
    ShortItemNumber: string;
    DefaultClientUomID: string;
    DefaultClientUomDescription: string;
    ImportDate: string;
    ImportFileName: string;
    WholesalePrice: number;
    SizeScaleDetailID: string;
    HarmonizedSystemCode: string;
    ManufacturerIdentificationCode: string;
    OriginCountryID: string;
    OriginCountryName: string;
    ItemTypeDescription: string;
    InventoryMethodDescription: string;
    CommitSequenceDescription: string;
    CommodityDescription: string;
    ProductGroupDescription: string;
    DefaultItemPrice: number;
    Length: number;
    Width: number;
    Height: number;
    Weight: number;
    DimensionFactor: number;
    Precision: number;
    ItemDimension: string;
    TotalReceivedUnitsWithDimensions: number;
    ActualCube: number;
    ReceivedCube: number;
    CommitSequence: string;
    ClientItemIdentifier: string;
    ItemIdentity: number;
    CommodityName: string;
    IsLotSerial: boolean;
    InnerQuantity: number;
    FinalSale: boolean;
    HeightCompressionFactor: number;
    LengthCompressionFactor: number;
    WidthCompressionFactor: number;
    HorizontalFolds: number;
    VerticalFolds: number;
    ClientBillingGroupName: string;
    ClientBillingGroupDescription: string;
    DimensionUomName: string;
    WeightUOMName: string;
    ProductGroupName: string;
    ID: string;
    IsFromCache: boolean;
    LastUpdate: string;
    SequenceNumber: number;
    HasXmlData: boolean;
    IsValid: boolean;
    BrokenRules: any[];
    IsReadOnly: boolean;
    IsNew: boolean;
    IsDeleted: boolean;
  }
  
  // Interface for the paginated API response
  export interface InventoryItemsResponse {
    Count: number;
    Items: InventoryItem[];
    PageCount: number;
    PageNumber: number;
    PageSize: number;
  }

 export interface InventoryItemsDGProps extends DataGridPremiumProps<InventoryItem> {
    rows: InventoryItem[];
    columns: DataGridPremiumProps<InventoryItem>['columns'];
  }
  
// Define the columns structure using GridColDef
export type InventoryItemsColumns = GridColDef[];

// Define the rows structure using GridRowsProp
export type InventoryItemsRows = GridRowsProp;
