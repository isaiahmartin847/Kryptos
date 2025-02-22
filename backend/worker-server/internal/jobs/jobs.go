package jobs

import (
	"worker-server/internal/ai"
	"worker-server/internal/repository"
)

type Job struct {
	repo     repository.DbRepository
	aiClient ai.AiInterface
}

func NewJob(repo repository.DbRepository, aiClient ai.AiInterface) *Job {
	return &Job{
		repo:     repo,
		aiClient: aiClient,
	}
}
