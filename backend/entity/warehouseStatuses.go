package entity

import "gorm.io/gorm"

type WarehouseStatuses struct {
	gorm.Model
	WarehouseStatus string
}
