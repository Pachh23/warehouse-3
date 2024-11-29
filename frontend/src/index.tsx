/*
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

package entity

import "gorm.io/gorm"

type Products struct {
	gorm.Model
	ProductName    string `json:"product_name"`
	CategoryID     uint
	Price          float64
	ProductPicture string
}
*/