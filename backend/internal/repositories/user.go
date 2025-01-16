package repositories

import "github.com/isaiahmartin847/Reg-Maps/internal/models"

// Rename from UserRepositories to UserRepository
type UserRepository struct {
	*Repository
}

func NewUserRepository(repo *Repository) *UserRepository {
	return &UserRepository{Repository: repo}
}
func (r *Repository) CreateUser(user *models.User) (*models.User, error) {
	if err := r.DB.Create(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
