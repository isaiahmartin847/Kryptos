package models

type Input struct {
	Role    string `json:"role"`
	Message string `json:"message"`
}

type WebSocketMessage struct {
	Type    string `json:"type"`    // e.g., "chat", "system", "error"
	Payload Input  `json:"payload"` // Your existing Input struct as payload
}
