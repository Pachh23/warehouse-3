package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	WarehouseID     string  `json:"warehouse_id"`
	WarehouseName   string  `json:"warehouse_name"`
	WarehouseTypeID string  `json:"warehouse_type_id"`
	Capacity        float64 `json:"capacity"`
	WarehouseStatus bool    `json:"warehouse_status"`
	ProvinceID      uint    `json:"province"`
	Address         string  `json:"address"`
	Zipcode         string  `json:"zipcode"`
}
