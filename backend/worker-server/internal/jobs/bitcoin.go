package jobs

import (
	"log"
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

	latestDbPrice, err := j.repo.GetLatest()
	if err != nil {
		logger.Log.Fatal("unable to query the latest price")
		return
	}

	latestBtcPrice, err := GetBtcPrice()
	if err != nil {
		logger.Log.Fatalf("Unable to get the latest bitcoin price error: %v", err)
	}

	// Log today's BTC price timestamp and latest DB price date
	logger.Log.Printf("Todays date: %v", latestBtcPrice.TimeStamp)
	logger.Log.Printf("Latest in db: %v", latestDbPrice.Date)

	todayDate := latestBtcPrice.TimeStamp.Format("2006-01-02")
	latestBitcoinDateInDB := latestDbPrice.Date.Format("2006-01-02")

	if todayDate > latestBitcoinDateInDB { // String comparison
		logger.Log.Println("Inserting the new data")
		err := j.repo.InsertNewBitcoinData(latestBtcPrice)
		if err != nil {
			logger.Log.Fatalf("Unable to insert data into the db err: %v", err)
		}
	} else {
		logger.Log.Println("Today's date is equal to latestBitcoinDateInDB or earlier")
	}

}
