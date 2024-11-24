export interface WarehousesInterface {
  WarehouseID?: string;
  WarehouseName?: string;
  WarehouseTypeID?: number;
  WarehouseStatusID?: number;
  Capacity?: number;
  WarehouseStatus?: boolean;
  Address?: string;
  Zipcode?: { zipcode: string };
  ProvinceID?: number;

}
