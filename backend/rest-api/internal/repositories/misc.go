package repositories

// not initialized yet
import (
	"gorm.io/gorm"
)

type MiscRepository struct {
	db *gorm.DB
}

func NewMiscRepository(db *gorm.DB) *MiscRepository {
	return &MiscRepository{
		db: db,
	}
}
