package models

// Meta holds API metadata.
type Meta struct {
	Version string `json:"version"`
}

type Data[T any] struct {
	Items []T  `json:"items"`
	Meta  Meta `json:"meta"`
}

// ApiResponse is the main structure for API responses.
type ApiResponse[T any] struct {
	Status string  `json:"status"`
	Data   Data[T] `json:"data"`
}
