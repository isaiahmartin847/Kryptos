package app

import (
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/ai"
	handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"github.com/isaiahmartin847/Reg-Maps/internal/websockets"
	"gorm.io/gorm"
)

func InitializeDependencies(db *gorm.DB, aiClient *ai.AIClient) (*handler.Handler, error) {
	if db == nil {
		return nil, fmt.Errorf("database connection is required")
	}
	if aiClient == nil {
		return nil, fmt.Errorf("AI client is required")
	}

	// Initialize repositories
	userRepo := repositories.NewUserRepository(db)
	sessionRepo := repositories.NewSessionRepository(db)
	stateRepo := repositories.NewStateRepository(db)
	speciesRepo := repositories.NewSpeciesRepository(db)
	huntingUnitRepo := repositories.NewHuntingUnitRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo)
	sessionService := service.NewSessionService(sessionRepo)
	stateService := service.NewStateService(stateRepo)
	speciesService := service.NewSpeciesService(speciesRepo)
	huntingUnitService := service.NewHuntingUnitService(huntingUnitRepo)
	aiService := service.NewAIService(aiClient)

	// Initialize WebSocket hub
	wsHub := websockets.NewHub()
	go wsHub.Run()

	// Initialize handler
	handler := &handler.Handler{
		UserService:        userService,
		SessionService:     sessionService,
		StateService:       stateService,
		SpeciesService:     speciesService,
		HuntingUnitService: huntingUnitService,
		AIService:          aiService,
		WebSocketHub:       wsHub,
	}

	return handler, nil
}
