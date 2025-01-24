package handler

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"github.com/isaiahmartin847/Reg-Maps/internal/websockets"
)

type Handler struct {
	UserService        *service.UserService
	SessionService     *service.SessionService
	StateService       *service.StateService
	SpeciesService     *service.SpeciesService
	HuntingUnitService *service.HuntingUnitService
	AIService          *service.AIService
	WebSocketHub       *websockets.Hub
}
