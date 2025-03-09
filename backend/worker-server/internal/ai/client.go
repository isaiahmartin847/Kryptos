package ai

import (
	"context"
	"fmt"
	"worker-server/internal/models"
	"worker-server/logger"

	"github.com/sashabaranov/go-openai"
)

// AiInterface defines the methods that any AI client implementation must provide.
type AiInterface interface {
	// GenerateResponse takes prompt data and returns a generated response.
	GenerateResponse(promptData []models.DailyPrice) (string, error)
}

type AIClient struct {
	aiClient *openai.Client
}

func NewAIClient(apiKey string) *AIClient {
	return &AIClient{
		aiClient: openai.NewClient(apiKey),
	}
}

func (c *AIClient) GenerateResponse(promptData []models.DailyPrice) (string, error) {
	resp, err := c.aiClient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					Content: fmt.Sprintf(
						"Analyze this data and predict tomorrow's price. Each object is structured like this: { price, marketcap, total_volume, date } %v. Return **only** the predicted price as a number, formatted to exactly two decimal places (e.g., '12345.67'). Do not include any words, explanations, or symbols. Your response must be only the number.",
						promptData,
					),
				},
			},
		},
	)

	if err != nil {
		return "", err
	}

	logger.Debug("Debug: AI response: %v", resp.Choices[0].Message.Content)
	return resp.Choices[0].Message.Content, nil
}
