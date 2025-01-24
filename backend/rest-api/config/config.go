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
	return &Config{
		Server: ServerConfig{
			Port: ":8080", // Make this configurable
		},
	}, nil
}
