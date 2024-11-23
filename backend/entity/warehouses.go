package entity

import (
	"fmt"

	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	WarehouseID     string          `json:"warehouse_id" gorm:"primaryKey"`
	WarehouseName   string          `json:"warehouse_name" gorm:"unique"`
	WarehouseTypeID uint            `json:"warehouse_type_id"`
	Capacity        float64         `json:"capacity"` // หน่วย: m³ (ลูกบาศก์เมตร)
	WarehouseStatus bool            `json:"warehouse_status"`
	Address         string          `json:"address"`
	Zipcode         string          `json:"zipcode"`
	ProvinceID      uint            `json:"province_id"`
	Province        *Provinces      `gorm:"foreignKey: province_id" json:"province"`
	WarehouseType   *WarehouseTypes `gorm:"foreignKey: warehouse_type_id" json:"warehouse_type"`
}

// BeforeCreate hook เพื่อสร้าง WarehouseID อัตโนมัติ
func (w *Warehouses) BeforeCreate(tx *gorm.DB) (err error) {
	var count int64
	// ค้นหาจำนวน record ในฐานข้อมูลที่มี WarehouseID
	tx.Model(&Warehouses{}).Count(&count)

	// สร้าง WarehouseID โดยใช้รูปแบบ W001, W002, ...
	w.WarehouseID = fmt.Sprintf("W%03d", count+1)
	return
}
