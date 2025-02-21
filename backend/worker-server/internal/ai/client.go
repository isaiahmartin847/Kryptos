package ai

import (
	"context"
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

func (c *AIClient) GenerateResponse() (string, error) {
	resp, err := c.aiClient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "Hello!",
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
