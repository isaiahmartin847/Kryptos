package jobs

import (
	"time"
	"worker-server/logger"
)

func (j *Job) GetBtcPrice() {

	latestPrice, err := j.repo.GetLatest()
	if err != nil {
		logger.Log.Fatal("unable to query the latest price")
		return
	}

	todayDate := time.Now().UTC()
	logger.Log.Printf("Todays date: %v", todayDate)
	logger.Log.Printf("latest in db: %v", latestPrice.Date)

	// latestPrice.Date is already of type time.Time, no need to parse again
	latestBitcoinDateInDB := latestPrice.Date

	// Compare the two times directly
	if todayDate.After(latestBitcoinDateInDB) {
		// this is where we insert the new price of btc
		logger.Log.Println("Todays date is after latestBitcoinDateInDB")
	} else {
		// this is where we break the function
		logger.Log.Println("todays date is equal to latestBitcoinDateInDB")
	}

	// btcPrice, err := api.GetTodaysBtcPrice()
	// if err != nil {
	// 	log.Fatalf("Failed to get the bitcoin price %v", err)
	// 	return
	// }

	// logger.Log.Printf("btc: %v", btcPrice)

}
