package entity

import "gorm.io/gorm"

type WarehouseTypes struct {
	gorm.Model
	WarehouseTypeName string `json:"warehouse_type_name"`
}
