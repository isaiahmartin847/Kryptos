package logger

import (
	"log"
	"os"
)

// Initialize the logger
var Log *log.Logger

func init() {

	Log = log.New(os.Stdout, "WORKER-INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
}
