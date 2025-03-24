package app

import (
	"fmt"
	"log"
	"os"

	handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"github.com/stripe/stripe-go/v75/client"
	"gorm.io/gorm"
)

func InitializeDependencies(db *gorm.DB) (*handler.Handler, error) {
	if db == nil {
		return nil, fmt.Errorf("database connection is required")
	}

	stripeAPIKey := os.Getenv("STRIPE_SECRET_KEY_TEST")

	if stripeAPIKey == "" {
		log.Fatal("STRIPE_SECRET_KEY_TEST this Key didn't exist in the env file")
	}

	// Initialize external clients
	stripeClient := &client.API{}
	stripeClient.Init(stripeAPIKey, nil)

	// Initialize repositories
	userRepo := repositories.NewUserRepository(db)
	bitcoinRepo := repositories.NewChartRepository(db)
	stockRepo := repositories.NewStockRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo)
	bitcoinService := service.NewBtcService(bitcoinRepo)
	stockService := service.NewStockService(stockRepo)

	// Initialize handler
	handler := &handler.Handler{
		UserService:  userService,
		BtcService:   bitcoinService,
		StockService: stockService,
		StripeClient: stripeClient,
	}

	return handler, nil
}
