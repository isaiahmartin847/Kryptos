package ai

import (
	"context"

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

func (c *AIClient) GenerateResponse(ctx context.Context, prompt string) (string, error) {
	resp, err := c.aiClient.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
		},
	)
	if err != nil {
		return "", err
	}

	return resp.Choices[0].Message.Content, nil

}
