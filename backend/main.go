package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"warehouse.com/warehouse/config"
	"warehouse.com/warehouse/controller/provinces"
	"warehouse.com/warehouse/controller/warehouseStatuses"
	"warehouse.com/warehouse/controller/warehouseTypes"
	"warehouse.com/warehouse/controller/warehouses"
)

const PORT = "8000"

func main() {
	// open connection database
	config.ConnectionDB()
	// Generate databases
	config.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Auth Route
	r.POST("/warehouses-create", warehouses.Create)
	router := r.Group("/")
	{
		// Warehouse Route
		router.PUT("/warehouse/:id", warehouses.Update)
		router.GET("/warehouses", warehouses.GetAll)
		router.GET("/warehouse/:id", warehouses.Get)
		router.DELETE("/warehouse/:id", warehouses.Delete)
	}
	r.GET("/warehouseTypes", warehouseTypes.GetAll)
	r.GET("/warehouseStatuses", warehouseStatuses.GetAll)
	r.GET("/provinces", provinces.GetAll)
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	// Run the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
