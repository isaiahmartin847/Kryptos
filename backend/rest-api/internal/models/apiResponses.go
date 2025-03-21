package models

// Meta holds API metadata.
type Meta struct {
	Version string `json:"version"`
}

type Data[T any] struct {
	Items []T    `json:"items,omitempty"`
	Item  *T     `json:"item,omitempty"` // Changed to pointer
	Stock *Stock `json:"stock,omitempty"`
	Meta  Meta   `json:"meta"`
}

type ApiResponse[T any] struct {
	Status string  `json:"status"`
	Data   Data[T] `json:"data"`
}
