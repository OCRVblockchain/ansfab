package config

import (
	"flag"
	"github.com/spf13/viper"
	"log"
)

var Configuration Config

type ElasticConfig struct {
	User     string
	Password string
	Index    string
}

type Config struct {
	Elastic ElasticConfig
}

func GetConfig() *Config {
	configName := flag.String("configname", "config", "name of file with elastic configuration")
	configType := flag.String("configtype", "yaml", "type of the config file")

	flag.Parse()
	viper.SetConfigName(*configName)
	viper.SetConfigType(*configType)
	viper.AddConfigPath("./../")
	viper.AddConfigPath("./")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("error reading config file, %s", err)
	}

	err := viper.Unmarshal(&Configuration)

	if err != nil {
		log.Fatalf("unable to decode into struct, %v", err)
	}

	return &Configuration
}
