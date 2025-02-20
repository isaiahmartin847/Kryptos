package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"worker-server/logger"
)

type MarketChart struct {
	Prices       [][]float64 `json:"prices"`
	MarketCaps   [][]float64 `json:"market_caps"`
	TotalVolumes [][]float64 `json:"total_volumes"`
}

type FormattedData struct {
	Price       float64
	MarketCap   float64
	TotalVolume float64
	timeStamp   time.Time
}

func GetTodaysBtcPrice() (*FormattedData, error) {
	response, err := http.Get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=0&interval=daily")

	if err != nil {
		logger.Log.Fatal("unable to fetch", err)
		return nil, err
	}

	defer response.Body.Close()

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		logger.Log.Fatal("error reading data", err)
		return nil, err
	}

	var marketData MarketChart
	err = json.Unmarshal(responseData, &marketData)
	if err != nil {
		logger.Log.Fatal("Error unmarshaling JSON:", err)
		return nil, err
	}

	if len(marketData.Prices) == 0 {
		return nil, fmt.Errorf("no btc numbers found")
	}

	timeStamp := time.Unix(int64(marketData.Prices[0][0]/1000), 0)

	currentBitcoinPrice := &FormattedData{
		Price:       marketData.Prices[0][1],
		MarketCap:   marketData.MarketCaps[0][1],
		TotalVolume: marketData.TotalVolumes[0][1],
		timeStamp:   timeStamp,
	}

	return currentBitcoinPrice, nil

}
