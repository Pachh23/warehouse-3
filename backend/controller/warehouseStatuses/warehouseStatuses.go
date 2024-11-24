package warehouseStatuses

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"warehouse.com/warehouse/config"
	"warehouse.com/warehouse/entity"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var warehouseStatuses []entity.WarehouseStatuses
	db.Find(&warehouseStatuses)
	c.JSON(http.StatusOK, &warehouseStatuses)
}
