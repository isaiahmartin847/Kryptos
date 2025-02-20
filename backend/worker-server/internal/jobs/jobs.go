package jobs

import (
	"worker-server/internal/repository"
)

type Job struct {
	repo repository.UserRepository
}

func NewJob(repo repository.UserRepository) *Job {
	return &Job{repo: repo}
}
