package models

type (
	StripeError struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	}
)

type (
	Bitcoin struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	}
)

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
