package ai

import (
	"context"
	"fmt"
	"worker-server/internal/models"
	"worker-server/logger"

	openai "github.com/sashabaranov/go-openai"
)

type AIClient struct {
	aiClient *openai.Client
}

func NewAIClient(apiKey string) *AIClient {
	return &AIClient{
		aiClient: openai.NewClient(apiKey),
	}
}

func (c *AIClient) GenerateResponse(promptData []models.BitcoinPromptStruct) (string, error) {
	resp, err := c.aiClient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: fmt.Sprintf("Analyze this data and give me a prediction of tomorrow's price. Each object is structured like this: { price, marketcap, total_volume, date } %v Return just the number down to two decimals don't return any words", promptData),
				},
			},
		},
	)

	if err != nil {
		return "", err
	}

	logger.Log.Printf("%v", resp.Choices[0].Message.Content)
	return resp.Choices[0].Message.Content, nil
}
