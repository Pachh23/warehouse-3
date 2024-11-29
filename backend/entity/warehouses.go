package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	WarehouseName     string `gorm:"unique;not null"`
	WarehouseTypeID   uint
	Capacity          float64 `json:"capacity"` // หน่วย: m³ (ลูกบาศก์เมตร)
	WarehouseStatusID uint
	Address           string `json:"address"`
	Zipcode           string `json:"zipcode"`
	ProvinceID        uint
	Province          *Provinces         `gorm:"foreignKey: ProvinceID" `
	WarehouseType     *WarehouseTypes    `gorm:"foreignKey: WarehouseTypeID" `
	WarehouseStatus   *WarehouseStatuses `gorm:"foreignKey: WarehouseStatusID" `
}

/*
// BeforeCreate hook เพื่อสร้าง WarehouseID อัตโนมัติ
func (w *Warehouses) BeforeCreate(tx *gorm.DB) (err error) {
	var count int64
	// ค้นหาจำนวน record ในฐานข้อมูลที่มี WarehouseID
	tx.Model(&Warehouses{}).Count(&count)

	// สร้าง WarehouseID โดยใช้รูปแบบ W001, W002, ...
	w.WarehouseID = fmt.Sprintf("W%03d", count+1)
	return
}
*/
