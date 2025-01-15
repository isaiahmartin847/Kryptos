package models



type WebhookLoginPayload struct {
	Event string `json:"event"`
	Data struct {
		UserID       string `json:"user_id"`
		EmailAddress string `json:"email_address"`
		FirstName    string `json:"first_name"`
		LastName     string `json:"last_name"`
		CreatedAt    string `json:"created_at"`
		UpdatedAt    string `json:"updated_at"`
		EmailVerified bool  `json:"email_verified"` // For email-based logins
		LoginMethod  string `json:"login_method"`   // Login method (e.g., "password", "google", "magic_link")
		Provider     string `json:"provider"`       // For social logins (e.g., "google", "github")
		AuthDetails  struct {
			// OAuth-related fields, if applicable
			OAuthAccessToken string `json:"oauth_access_token,omitempty"`
			OAuthIDToken     string `json:"oauth_id_token,omitempty"`
		} `json:"auth_details,omitempty"`
		PublicMetadata struct {
			Role string `json:"role"`
			Preferences struct {
				Theme string `json:"theme"`
			} `json:"preferences"`
		} `json:"public_metadata"`
		PrivateMetadata struct {
			StripeCustomerID string `json:"stripe_customer_id"`
		} `json:"private_metadata"`
		Address struct {
			Street     string `json:"street"`
			City       string `json:"city"`
			State      string `json:"state"`
			PostalCode string `json:"postal_code"`
		} `json:"address"`
		PhoneNumber string `json:"phone_number"`
		IsVerified  bool   `json:"is_verified"`
		ProfilePicture string `json:"profile_picture,omitempty"` // Only for social logins
	} `json:"data"`
	Signature string `json:"signature"`
}
