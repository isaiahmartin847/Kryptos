// internal/service/stripe_client.go
package service

import (
	"github.com/stripe/stripe-go/v74"
)

type StripeClient struct {
}

func NewStripeClient(secretKey string) *StripeClient {
    stripe.Key = secretKey
    return &StripeClient{}
}