package models

// Meta holds API metadata.
type Meta struct {
	Version string `json:"version"` // Version of the API
}

// Data holds the actual items returned in the response.
type Data[T any] struct {
	Items []T  `json:"items"` // Slice of items
	Meta  Meta `json:"meta"`  // API metadata
}

// ApiResponse is the main structure for API responses.
type ApiResponse[T any] struct {
	Status string  `json:"status"`
	Data   Data[T] `json:"data"`
}
