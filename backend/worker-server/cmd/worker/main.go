package main

import (
	"log"
	"time"
	"worker-server/internal/jobs"
	"worker-server/logger"

	"github.com/go-co-op/gocron"
)

func main() {
	logger.Log.SetFlags(log.Ltime | log.Lshortfile)

	scheduler := gocron.NewScheduler(time.UTC)

	scheduler.Every(1).Minute().Do(jobs.TestJob)

	scheduler.StartAsync()

	select {}
}
