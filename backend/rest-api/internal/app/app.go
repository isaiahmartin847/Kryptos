package app

import (
	"fmt"

	handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"gorm.io/gorm"
)

func InitializeDependencies(db *gorm.DB) (*handler.Handler, error) {
	if db == nil {
		return nil, fmt.Errorf("database connection is required")
	}

	// Initialize repositories
	userRepo := repositories.NewUserRepository(db)
	bitcoinRepo := repositories.NewBitcoinRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo)
	bitcoinService := service.NewBitcoinService(bitcoinRepo)

	// Initialize handler
	handler := &handler.Handler{
		UserService:    userService,
		BitcoinService: bitcoinService,
	}

	return handler, nil
}
