package entity

import "gorm.io/gorm"

type InventoryCounts struct {
	gorm.Model
	ProductID       uint
	WarehouseID     uint
	CountedQuantity uint
	Remark          string
	Warehouse       Warehouses `gorm:"foreignKey: WarehouseID" json:"warehouse"`
	Product         Products   `gorm:"foreignKey: ProductID" json:"product"`
}
