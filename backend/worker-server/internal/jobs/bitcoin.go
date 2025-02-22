package jobs

import (
	"log"
	"strconv"
	"time"
	"worker-server/internal/api"
	"worker-server/internal/models"
	"worker-server/logger"
)

func GetBtcPrice() (*models.BitcoinFetchResponse, error) {

	btcPrice, err := api.GetTodaysBtcPrice()
	if err != nil {
		log.Fatalf("Failed to get the bitcoin price %v", err)
		return nil, err
	}

	return btcPrice, nil

}

func (j *Job) InsertBitcoinPrice() {

	latestDbPrice, err := j.repo.GetLatestBtcPrice()
	if err != nil {
		logger.Log.Fatal("unable to query the latest price")
		return
	}

	latestBtcPrice, err := GetBtcPrice()
	if err != nil {
		logger.Log.Fatalf("Unable to get the latest bitcoin price error: %v", err)
	}

	todayDate := latestBtcPrice.TimeStamp.Format("2006-01-02")
	latestBitcoinDateInDB := latestDbPrice.Date.Format("2006-01-02")

	if todayDate > latestBitcoinDateInDB {
		logger.Log.Println("Inserting the new data")
		err := j.repo.InsertNewBitcoinData(latestBtcPrice)
		if err != nil {
			logger.Log.Fatalf("Unable to insert data into the db err: %v", err)
		}
	} else {
		logger.Log.Println("Today's date is equal to latestBitcoinDateInDB or earlier")
	}

}

func (j *Job) InsertBtcPrediction() {
	lastThirty, err := j.repo.GetLastThirtyBtcData()
	if err != nil {
		logger.Log.Fatalf("Unable to get the last thirty %v", err)
	}

	prediction, err := j.aiClient.GenerateResponse(lastThirty)
	if err != nil {
		logger.Log.Fatalf("Unable to create a prediction %v", err)
	}

	predictionFloat, err := strconv.ParseFloat(prediction, 64)
	if err != nil {
		logger.Log.Fatal("convert string to float")
	}

	predictionData := models.BitcoinPredictionData{
		Price: predictionFloat,
		Date:  time.Now().Add(24 * time.Hour),
	}

	j.repo.InsertNewBitcoinPredictionData(&predictionData)

}
