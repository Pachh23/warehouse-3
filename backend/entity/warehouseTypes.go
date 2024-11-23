package entity

import "gorm.io/gorm"

type WarehouseTypes struct {
	gorm.Model
	WarehouseType string `json:"warehouse_type"`
}
