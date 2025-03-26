package models

type User struct {
	ID            string `gorm:"primary_key"`
	FirstName     string
	LastName      string
	Email         string
	AcceptedTerms bool
	CreatedAt     uint64
}

type UserTerms struct {
	AcceptedTerms bool `json:"has_accepted_terms"`
}

func (User) TableName() string {
	return "users"
}
