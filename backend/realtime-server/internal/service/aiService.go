package service

import (
	"context"

	"github.com/isaiahmartin847/realtime-server/internal/ai"
)

type AIService struct {
	client *ai.AIClient
}

func NewAIService(client *ai.AIClient) *AIService {
	return &AIService{
		client: client,
	}
}

func (s *AIService) GenerateResponse(ctx context.Context, prompt string) (string, error) {
	return s.client.GenerateResponse(ctx, prompt)
}
