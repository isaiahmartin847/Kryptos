package logger

import (
	"fmt"
	"os"
	"time"
)

// Logger is a simple logger with different log levels.
type Logger struct {
	logLevel string
}

// New creates a new Logger instance.
func New(logLevel string) *Logger {
	return &Logger{logLevel: logLevel}
}

// log formats the log message with a timestamp and level.
func (l *Logger) log(level, msg string, args ...any) {
	if level == "DEBUG" || level == "INFO" || level == "WARN" || level == "ERROR" || level == "FATAL" {
		timestamp := time.Now().Format(time.RFC3339)
		formattedMsg := fmt.Sprintf(msg, args...)
		fmt.Printf("[%s] %s: %s\n", level, timestamp, formattedMsg)
	}
}

// Debug logs a message at the debug level.
func (l *Logger) Debug(msg string, args ...any) {
	l.log("DEBUG", msg, args...)
}

// Info logs a message at the info level.
func (l *Logger) Info(msg string, args ...any) {
	l.log("INFO", msg, args...)
}

// Warn logs a message at the warning level.
func (l *Logger) Warn(msg string, args ...any) {
	l.log("WARN", msg, args...)
}

// Error logs a message at the error level.
func (l *Logger) Error(msg string, args ...any) {
	l.log("ERROR", msg, args...)
}

// Fatal logs a message at the fatal level and exits the program.
func (l *Logger) Fatal(msg string, args ...any) {
	l.log("FATAL", msg, args...) // Log as an error
	os.Exit(1)                   // Exit with a non-zero status code
}

var defaultLogger *Logger

// Setup initializes the logger.
func Setup() {
	defaultLogger = New("INFO") // Set the default log level
}

// Use the default logger to log messages
func Debug(msg string, args ...any) {
	defaultLogger.Debug(msg, args...)
}

func Info(msg string, args ...any) {
	defaultLogger.Info(msg, args...)
}

func Warn(msg string, args ...any) {
	defaultLogger.Warn(msg, args...)
}

func Error(msg string, args ...any) {
	defaultLogger.Error(msg, args...)
}

func Fatal(msg string, args ...any) {
	defaultLogger.Fatal(msg, args...)
}
