package service

import (
	"context"
	"math"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/logger"
)

type ChartService struct {
	ChartRepo *repository.ChartRepository
}

func NewChartService(chartRepo *repository.ChartRepository) *ChartService {
	return &ChartService{ChartRepo: chartRepo}
}

func (s *ChartService) GetChartData(ctx context.Context, ticker string) ([]models.ChartData, error) {

	chartData, err := s.ChartRepo.GetChartData(ctx, ticker)

	if err != nil {
		logger.Error("Unable to get the chart data on the service layer error: %v", err)
		return nil, err
	}

	for i := range chartData {
		chartData[i].DailyPrice = math.Floor(chartData[i].DailyPrice*100) / 100
	}

	return chartData, nil

}
