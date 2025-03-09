package jobs

import (
	"fmt"
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

func (j *Job) InsertNewDailyPrice(id int64) {

	latestDbPrice, err := j.repo.GetLatestPrice(id)
	if err != nil {
		logger.Error("Error: unable to query the latest price")
		return
	}

	logger.Info("latest Db price %v", latestDbPrice)

	// latestBtcPrice, err := GetBtcPrice()
	// if err != nil {
	// 	logger.Error("Error: unable to get the latest bitcoin price error: %v", err)
	// 	return
	// }

	// todayDate := latestBtcPrice.TimeStamp.Format("2006-01-02")
	// latestBtcDateInDB := latestDbPrice.Date.Format("2006-01-02")

	// if todayDate > latestBtcDateInDB {
	// 	logger.Debug("Inserting the new btc data.")
	// 	err := j.repo.InsertNewBtcData(latestBtcPrice)
	// 	if err != nil {
	// 		logger.Error("Error: unable to insert data into the db err: %v", err)
	// 	}

	// 	j.InsertBtcPrediction()

	// } else {
	// 	logger.Info("Today's date is equal to latestBtcDateInDB or earlier")
	// }

}

func (j *Job) TestingFunc(stockID int64) {
	lastThirtyDaysPrice, err := j.repo.GetLastThirtyDaysPrices(stockID)

	if err != nil {
		logger.Error(fmt.Sprintf("Error: Unable to get the last thirty days %v", err))
	}

	logger.Info(fmt.Sprintf("Last thirty days: %v", lastThirtyDaysPrice))

}

// func (j *Job) InsertNewForecast(stockID int64) {
// 	lastThirty, err := j.repo.GetLastThirtyDaysPrices(stockID)
// 	if err != nil {
// 		logger.Error("Error: Unable to get the last thirty %v", err)
// 		return
// 	}

// 	logger.Info("%v", lastThirty)

// prediction, err := j.aiClient.GenerateResponse(lastThirty)
// if err != nil {
// logger.Error("Error: unable to create a prediction %v", err)
// return
// }
//
// predictionFloat, err := strconv.ParseFloat(prediction, 64)
// if err != nil {
// logger.Error("Error: converting string to float")
// return
// }
//
// predictionData := models.BtcPredictionData{
// 	Price: predictionFloat,
// 	Date:  time.Now().Add(24 * time.Hour),
// }

// j.repo.InsertNewBtcPredictionData(&predictionData)

// }
