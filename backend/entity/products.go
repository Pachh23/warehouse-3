package entity

import "gorm.io/gorm"

type Products struct {
	gorm.Model
	ProductName    string `json:"product_name"`
	CategoryID     uint
	Price          float64
	ProductPicture string
}
