package logger

import (
	"context"
	"log/slog"
	"os"
	"path/filepath"
	"runtime"
	"strconv"
)

// customSourceHandler is a wrapper around slog.Handler to modify source output
type customSourceHandler struct {
	handler slog.Handler
}

// Declare defaultLogger globally so it can be used in all log functions
var defaultLogger *slog.Logger

// Handle adds a short filename and line number to log attributes
func (h *customSourceHandler) Handle(ctx context.Context, r slog.Record) error {
	source := getCallerInfo()
	r.AddAttrs(slog.String("source", source))
	return h.handler.Handle(ctx, r)
}

// Enabled ensures logging is enabled at the requested level
func (h *customSourceHandler) Enabled(ctx context.Context, level slog.Level) bool {
	return h.handler.Enabled(ctx, level)
}

// WithAttrs returns a new handler with additional attributes
func (h *customSourceHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	return &customSourceHandler{handler: h.handler.WithAttrs(attrs)}
}

// WithGroup returns a new handler with a grouped log context
func (h *customSourceHandler) WithGroup(name string) slog.Handler {
	return &customSourceHandler{handler: h.handler.WithGroup(name)}
}

// getCallerInfo extracts the file and line number from runtime
func getCallerInfo() string {
	pc := make([]uintptr, 1)
	runtime.Callers(6, pc) // Get the caller stack frame
	frames := runtime.CallersFrames(pc)
	frame, _ := frames.Next()
	return filepath.Base(frame.File) + ":" + strconv.Itoa(frame.Line)
}

// Setup initializes the logger with a custom handler
func Setup() {
	handler := slog.NewTextHandler(os.Stdout, nil)
	customHandler := &customSourceHandler{handler: handler}
	defaultLogger = slog.New(customHandler) // Assign to global logger
	slog.SetDefault(defaultLogger)          // Set default slog logger
}

// Logging functions
func Debug(msg string, args ...any) { defaultLogger.DebugContext(context.Background(), msg, args...) }
func Info(msg string, args ...any)  { defaultLogger.InfoContext(context.Background(), msg, args...) }
func Warn(msg string, args ...any)  { defaultLogger.WarnContext(context.Background(), msg, args...) }
func Error(msg string, args ...any) { defaultLogger.ErrorContext(context.Background(), msg, args...) }
func Fatal(msg string, args ...any) {
	defaultLogger.ErrorContext(context.Background(), msg, args...)
	os.Exit(1)
}
