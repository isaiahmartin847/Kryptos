package models




type WebhookLoginPayload struct {
	Event string `json:"event"`
	Data struct {
		CreatedAt          int64  `json:"created_at"`            // Unix timestamp (number)
		EmailAddresses     []struct {
			EmailAddress string `json:"email_address"`
			ID           string `json:"id"`
			LinkedTo     []interface{} `json:"linked_to"`
			Object       string `json:"object"`
			Verification struct {
				Status   string `json:"status"`
				Strategy string `json:"strategy"`
			} `json:"verification"`
		} `json:"email_addresses"`
		ExternalAccounts   []interface{} `json:"external_accounts"`
		ExternalID         string        `json:"external_id"`
		FirstName          string        `json:"first_name"`
		ID                 string        `json:"id"`
		ImageURL           string        `json:"image_url"`
		LastName           string        `json:"last_name"`
		LastSignInAt       int64         `json:"last_sign_in_at"` // Unix timestamp (number)
		Object             string        `json:"object"`
		PasswordEnabled    bool          `json:"password_enabled"`
		PhoneNumbers       []interface{} `json:"phone_numbers"`
		PrimaryEmailAddressID string     `json:"primary_email_address_id"`
		PrimaryPhoneNumberID string      `json:"primary_phone_number_id"`
		PrimaryWeb3WalletID string       `json:"primary_web3_wallet_id"`
		PrivateMetadata    struct{}      `json:"private_metadata"`
		ProfileImageURL    string        `json:"profile_image_url"`
		PublicMetadata     struct{}      `json:"public_metadata"`
		TwoFactorEnabled   bool          `json:"two_factor_enabled"`
		UnsafeMetadata     struct{}      `json:"unsafe_metadata"`
		UpdatedAt          int64         `json:"updated_at"`   // Unix timestamp (number)
		Username           string        `json:"username"`
		Web3Wallets        []interface{} `json:"web3_wallets"`
	} `json:"data"`
	EventAttributes struct {
		Object   string `json:"object"`   // Event object
		Title    string `json:"title"`    // Event title
		Timestamp int64 `json:"timestamp"` // Unix millisecond timestamp
		Type     string `json:"type"`     // Event type (e.g., "user.created")
	} `json:"event_attributes"`
	Signature string `json:"signature"`
}
