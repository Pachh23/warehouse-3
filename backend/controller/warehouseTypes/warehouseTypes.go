package warehouseTypes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"warehouse.com/warehouse/config"
	"warehouse.com/warehouse/entity"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var warehouseTypes []entity.WarehouseTypes
	db.Find(&warehouseTypes)
	c.JSON(http.StatusOK, &warehouseTypes)
}
