package models


type User struct {
	user_id string `gorm:"primary_key"`
	first_name string 
	last_name string 
	email string 
	created_at uint64
}

func (User) TableName() string {
	return "user"
}