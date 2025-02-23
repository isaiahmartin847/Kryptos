package integration_test

import (
	"testing"
	"time"
	"worker-server/internal/api"
	"worker-server/internal/models"
)

func TestGetTodaysBtcPrice(t *testing.T) {
	t.Parallel()

	// Helper function for validation
	validateBtcResponse := func(t *testing.T, response *models.BtcFetchResponse) {
		t.Helper()

		if response == nil {
			t.Fatal("expected non-nil response")
		}

		if response.Price <= 0 {
			t.Errorf("invalid price: got %v, want > 0", response.Price)
		}

		if response.MarketCap <= 0 {
			t.Errorf("invalid market cap: got %v, want > 0", response.MarketCap)
		}

		if response.TotalVolume <= 0 {
			t.Errorf("invalid volume: got %v, want > 0", response.TotalVolume)
		}

		if time.Since(response.TimeStamp) > 24*time.Hour {
			t.Errorf("timestamp too old: got %v, want within last 24 hours", response.TimeStamp)
		}
	}

	t.Run("fetch_current_price", func(t *testing.T) {
		t.Parallel()

		response, err := api.GetTodaysBtcPrice()
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		validateBtcResponse(t, response)

		// Log values for manual verification
		t.Logf("Price: $%.2f", response.Price)
		t.Logf("Market Cap: $%.2f", response.MarketCap)
		t.Logf("Volume: $%.2f", response.TotalVolume)
		t.Logf("Timestamp: %v", response.TimeStamp)
	})

	t.Run("multiple_requests", func(t *testing.T) {
		t.Parallel()

		// Test making multiple requests to check reliability
		for i := 0; i < 3; i++ {
			response, err := api.GetTodaysBtcPrice()
			if err != nil {
				t.Errorf("request %d failed: %v", i+1, err)
				continue
			}
			validateBtcResponse(t, response)
			time.Sleep(time.Second) // Respect rate limiting
		}
	})
}
