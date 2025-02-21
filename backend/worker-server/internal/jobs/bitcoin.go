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

	// instead of the todays date we will fetch todays btc price form the external api
	todayDate := latestBtcPrice.TimeStamp
	logger.Log.Printf("Todays date: %v", todayDate)
	logger.Log.Printf("latest in db: %v", latestDbPrice.Date)

	latestBitcoinDateInDB := latestDbPrice.Date

	// Compare the two times directly
	if todayDate.After(latestBitcoinDateInDB) {
		// this is where we insert the new price of btc
		logger.Log.Println("Inserting the new data")
		err := j.repo.InsertNewBitcoinData(latestBtcPrice)
		if err != nil {
			logger.Log.Fatalf("Unable to insert data into the db err: %v", err)
		}
	} else {
		// this is where we break the function
		logger.Log.Println("todays date is equal to latestBitcoinDateInDB")
	}

}
