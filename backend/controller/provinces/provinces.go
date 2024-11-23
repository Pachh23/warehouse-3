package provinces

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"warehouse.com/warehouse/config"
	"warehouse.com/warehouse/entity"
)

func GetAll(c *gin.Context) {
	db := config.DB()
	var provinces []entity.Provinces
	db.Find(&provinces)
	c.JSON(http.StatusOK, &provinces)
}
