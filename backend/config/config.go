package config

type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
}

type ServerConfig struct {
	Port string
}

type DatabaseConfig struct {
	DSN string
}

func Load() (*Config, error) {
	// Load configuration from environment variables or files
	return &Config{
		Server: ServerConfig{
			Port: ":8080", // You might want to make this configurable
		},
		// Add other configuration sections as needed
	}, nil
}
