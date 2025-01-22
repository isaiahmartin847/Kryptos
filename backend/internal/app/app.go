package app

import (
	handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"gorm.io/gorm"
)

func InitializeDependencies(db *gorm.DB) *handler.Handler {
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

	// Initialize handler
	return &handler.Handler{
		UserService:        userService,
		SessionService:     sessionService,
		StateService:       stateService,
		SpeciesService:     speciesService,
		HuntingUnitService: huntingUnitService,
	}
}
