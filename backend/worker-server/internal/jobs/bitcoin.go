package jobs

import (
	"fmt"
	"strconv"
	"strings"
	"time"
	"worker-server/internal/api"
	"worker-server/internal/models"
	"worker-server/logger"
)

func GetBtcPrice(coinName string) (*models.BtcFetchResponse, error) {

	btcPrice, err := api.GetTodaysBtcPrice(coinName)
	if err != nil {
		logger.Error("Failed to get the bitcoin price %v", err)
		return nil, err
	}

	return btcPrice, nil

}

func (j *Job) InsertNewDailyPrice(stockID int64) {

	stock, err := j.repo.GetStockById(stockID)
	if err != nil {
		logger.Error("Error: unable to query the latest price")
		return
	}

	latestDbPrice, err := j.repo.GetLatestPrice(stockID)
	if err != nil {
		logger.Error("Error: unable to query the latest price")
		return
	}

	latestStockPrice, err := GetBtcPrice(strings.ToLower(stock.Name))
	if err != nil {
		logger.Error("Error: unable to get the latest bitcoin price error: %v", err)
		return
	}

	currentDate := latestStockPrice.TimeStamp.Format("2006-01-02")
	latestPriceDateInDB := latestDbPrice.Date.Format("2006-01-02")

	if currentDate > latestPriceDateInDB {
		logger.Debug("Inserting the new btc data.")

		change := latestStockPrice.Price - latestDbPrice.Price
		percentChange := (change / latestDbPrice.Price) * 100

		// this is what is throwing the insertion error
		logger.Info(fmt.Sprintf("This is the stock data %v", latestStockPrice))
		err := j.repo.InsertNewStockData(latestStockPrice, percentChange, stockID)
		if err != nil {
			logger.Error("Error: unable to insert data into the db err: %v", err)
		}

		j.InsertNewForecastedPrice(stockID)

	} else {
		logger.Info("Today's date is equal to latestBtcDateInDB or earlier")
	}

}

func (j *Job) InsertNewForecastedPrice(stockID int64) {
	lastThirtyDaysData, err := j.repo.GetLastThirtyDaysPrices(stockID)

	if err != nil {
		logger.Error(fmt.Sprintf("Error: Unable to get the last thirty days %v", err))
	}

	prediction, err := j.aiClient.GenerateResponse(lastThirtyDaysData)
	if err != nil {
		logger.Error("Error: unable to create a prediction %v", err)
		return
	}

	predictionFloat, err := strconv.ParseFloat(prediction, 64)
	if err != nil {
		logger.Error("Error: converting string to float")
		return
	}

	logger.Info("latest btc price, %v", lastThirtyDaysData[0])
	fmt.Printf("latest btc price, %v", lastThirtyDaysData[0])

	predictionData := models.PriceForecast{
		Price:   uint(predictionFloat),
		StockID: uint(stockID),
		Date:    time.Now().Add(24 * time.Hour),
	}

	j.repo.InsertNewStockForecast(&predictionData)

}
