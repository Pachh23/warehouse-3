package config

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"warehouse.com/warehouse/entity"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("se.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Provinces{},
		&entity.WarehouseTypes{},
		&entity.WarehouseStatuses{},
		&entity.Warehouses{},
		&entity.Products{},
		&entity.InventoryCounts{},
	)

	//----------------WarehouseType-------------//
	warehouseTypes := []string{"Dry Storage", "Cold Storage", "Hazardous Storage", "Bulk Storage"}
	for _, wType := range warehouseTypes {
		db.FirstOrCreate(&entity.WarehouseTypes{WarehouseType: wType}, &entity.WarehouseTypes{WarehouseType: wType})
	}

	//----------------WarehouseStatus-------------//
	warehouseStatuses := []string{"Available", "Full", "Nearly Full", "Empty"}
	for _, wStatus := range warehouseStatuses {
		db.FirstOrCreate(&entity.WarehouseStatuses{WarehouseStatus: wStatus}, &entity.WarehouseStatuses{WarehouseStatus: wStatus})
	}

	//----------------Provinces-------------//
	provinces := []string{
		"Amnat Charoen", "Ang Thong", "Bangkok", "Bueng Kan", "Buriram",
		"Chachoengsao", "Chainat", "Chaiyaphum", "Chanthaburi", "Chiang Mai",
		"Chiang Rai", "Chonburi", "Chumphon", "Kalasin", "Kamphaeng Phet",
		"Kanchanaburi", "Khon Kaen", "Krabi", "Lampang", "Lamphun",
		"Loei", "Lopburi", "Mae Hong Son", "Maha Sarakham", "Mukdahan",
		"Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan",
		"Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lamphu", "Nong Khai",
		"Nonthaburi", "Pathum Thani", "Pattani", "Phang Nga", "Phatthalung",
		"Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phitsanulok",
		"Phra Nakhon Si Ayutthaya", "Phrae", "Phuket", "Prachinburi", "Prachuap Khiri Khan",
		"Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo",
		"Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Saraburi",
		"Satun", "Sing Buri", "Sisaket", "Songkhla", "Sukhothai",
		"Suphan Buri", "Surin", "Surat Thani", "Tak", "Trang",
		"Trat", "Ubon Ratchathani", "Udon Thani", "Uttaradit", "Uthai Thani",
		"Yala", "Yasothon",
	}

	for _, provinceName := range provinces {
		db.FirstOrCreate(&entity.Provinces{Province: provinceName}, &entity.Provinces{Province: provinceName})
	}

	Warehouse := &entity.Warehouses{
		WarehouseName:     "Warehouse A",
		WarehouseTypeID:   3,
		Capacity:          500, // หน่วย: m³ (ลูกบาศก์เมตร)
		WarehouseStatusID: 1,
		Address:           "123/4 Sukhumvit 22, Khlong Tan Nuea, Watthana",
		Zipcode:           "10110",
		ProvinceID:        3,
	}
	db.FirstOrCreate(Warehouse, &entity.Warehouses{
		WarehouseName: "Warehouse A",
	})

}
