export interface ProvinceInterface {
  ID?: number;
  Province?: string;
}

export interface WarehousesInterface {
  ID?: number;
  WarehouseName?: string;
  WarehouseTypeID?: number;
  WarehouseStatusID?: number;
  Capacity?: number;
  WarehouseStatus?: boolean;
  Address?: string;
  Zipcode?: string;
  ProvinceID?: number;

}

export interface WarehouseStatusesInterface {
  ID?: number;
  WarehouseStatus?: string;
}

export interface WarehouseTypesInterface {
  ID?: number;
  WarehouseType?: string;
}