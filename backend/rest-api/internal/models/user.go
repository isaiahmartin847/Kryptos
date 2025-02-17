package models

type User struct {
	ID        string `gorm:"primary_key"`
	FirstName string
	LastName  string
	Email     string
	CreatedAt uint64
}

func (User) TableName() string {
	return "users"
}
