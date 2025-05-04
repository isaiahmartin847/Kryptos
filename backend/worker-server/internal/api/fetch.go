package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"worker-server/internal/models"
	"worker-server/logger"
)

func GetTodaysBtcPrice(coinName string) (*models.BtcFetchResponse, error) {
	response, err := http.Get(fmt.Sprintf("https://api.coingecko.com/api/v3/coins/%s/market_chart?vs_currency=usd&days=0&interval=daily", coinName))

	if err != nil {
		logger.Error("Error: unable to fetch the btc data. %v", err)
		return nil, err
	}

	defer response.Body.Close()

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		logger.Error("Error: error occurred trying to parse out btc data.", err)
		return nil, err
	}

	var marketData models.MarketChart
	err = json.Unmarshal(responseData, &marketData)
	if err != nil {
		logger.Error("Error: unmarshaling JSON:", err)
		return nil, err
	}

	if len(marketData.Prices) == 0 {
		logger.Error("Error: no btc prices found.")
		return nil, fmt.Errorf("no btc numbers found")
	}

	timeStamp := time.Unix(int64(marketData.Prices[0][0]/1000), 0)

	currentBitcoinPrice := &models.BtcFetchResponse{
		Price:       marketData.Prices[0][1],
		MarketCap:   marketData.MarketCaps[0][1],
		TotalVolume: marketData.TotalVolumes[0][1],
		TimeStamp:   timeStamp,
	}

	return currentBitcoinPrice, nil

}
