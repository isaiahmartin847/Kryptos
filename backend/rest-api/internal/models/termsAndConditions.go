package models

import "time"

type TermsAndConditions struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Version   string    `gorm:"not null;type:string"`
	Content   string    `gorm:"not null;type:text"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}

type SignedTerms struct {
	ID                 uint               `gorm:"primaryKey" json:"id"`
	AgreedToTerms      bool               `gorm:"not null" json:"agreed_to_terms"`
	CreatedAt          time.Time          `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt          time.Time          `gorm:"autoUpdateTime" json:"updated_at"`
	TermsID            uint               `gorm:"not null" json:"terms_id"`
	TermsAndConditions TermsAndConditions `gorm:"foreignKey:TermsID;constraint:OnDelete:CASCADE" json:"terms_and_conditions,omitempty"`
	UserID             string             `gorm:"not null;type:uuid" json:"user_id"`
	User               User               `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func (TermsAndConditions) TableName() string {
	return "terms_and_conditions"
}

func (SignedTerms) TableName() string {
	return "signed_terms"
}
