package main

import (
	"log"
	"worker-server/internal/logger"
)

func main() {
	logger.Log.SetFlags(log.Ltime | log.Lshortfile)

}
