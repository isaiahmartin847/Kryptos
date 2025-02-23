package jobs

import (
	"strconv"
	"time"
	"worker-server/internal/api"
	"worker-server/internal/models"
	"worker-server/logger"
)

func GetBtcPrice() (*models.BtcFetchResponse, error) {

	btcPrice, err := api.GetTodaysBtcPrice()
	if err != nil {
		logger.Error("Failed to get the bitcoin price %v", err)
		return nil, err
	}

	return btcPrice, nil

}

func (j *Job) InsertBtcPrice() {

	latestDbPrice, err := j.repo.GetLatestBtcPrice()
	if err != nil {
		logger.Error("Error: unable to query the latest price")
		return
	}

	latestBtcPrice, err := GetBtcPrice()
	if err != nil {
		logger.Error("Error: unable to get the latest bitcoin price error: %v", err)
		return
	}

	todayDate := latestBtcPrice.TimeStamp.Format("2006-01-02")
	latestBtcDateInDB := latestDbPrice.Date.Format("2006-01-02")

	if todayDate > latestBtcDateInDB {
		logger.Debug("Inserting the new btc data.")
		err := j.repo.InsertNewBtcData(latestBtcPrice)
		if err != nil {
			logger.Error("Error: unable to insert data into the db err: %v", err)
		}

		j.InsertBtcPrediction()

	} else {
		logger.Info("Today's date is equal to latestBtcDateInDB or earlier")
	}

}

func (j *Job) InsertBtcPrediction() {
	lastThirty, err := j.repo.GetLastThirtyBtcData()
	if err != nil {
		logger.Error("Error: Unable to get the last thirty %v", err)
		return
	}

	prediction, err := j.aiClient.GenerateResponse(lastThirty)
	if err != nil {
		logger.Error("Error: unable to create a prediction %v", err)
		return
	}

	predictionFloat, err := strconv.ParseFloat(prediction, 64)
	if err != nil {
		logger.Error("Error: converting string to float")
		return
	}

	predictionData := models.BtcPredictionData{
		Price: predictionFloat,
		Date:  time.Now().Add(24 * time.Hour),
	}

	j.repo.InsertNewBtcPredictionData(&predictionData)

}
