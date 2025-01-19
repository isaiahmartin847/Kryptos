package handler

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
)

type Handler struct {
	UserService    *service.UserService
	SessionService *service.SessionService
	StateService   *service.StateService
}
