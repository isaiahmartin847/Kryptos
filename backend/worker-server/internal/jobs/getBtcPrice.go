package jobs

import (
	"log"
	"worker-server/internal/api"
	"worker-server/logger"
)

func GetBtcPrice() {

	btcPrice, err := api.GetTodaysBtcPrice()
	if err != nil {
		log.Fatalf("Failed to get the bitcoin price %v", err)
		return
	}

	logger.Log.Printf("btc: %v", btcPrice)

}
