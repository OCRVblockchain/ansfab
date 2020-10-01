package service

type Query interface{}

type Response map[string]interface{}

type Subquery map[string]interface{}

type BoolQuery struct {
	Must   []Subquery `json:"must,omitempty"`
	Should []Subquery `json:"should,omitempty"`
	Filter []Subquery `json:"filter,omitempty"`
}

type QueryBase struct {
	Bool BoolQuery `json:"bool,omitempty"`
}

type SimpleQuery struct {
	Source      []string   `json:"_source,omitempty"`
	Query       QueryBase  `json:"query,omitempty"`
	Size        int        `json:"size,omitempty"`
	Sort        []Subquery `json:"sort,omitempty"`
	SearchAfter []string   `json:"search_after,omitempty"`
}

type SuggestQuery struct {
	Source  []string            `json:"_source,omitempty"`
	Suggest map[string]Subquery `json:"suggest,omitempty"`
}

var wheelsetFieldsLookup = map[string]string{
	"id":       "doc.id",
	"payload":  "doc.payload",
	"pagesize": "",
	"bookmark": "",
}

var suggestFieldsLookup = map[string]string{
	"id":             "doc.id_suggest",
	"storage_number": "doc.storage_number_suggest",
	"owner_name":     "doc.owner_name_suggest",
	"owner_inn":      "doc.owner_inn_suggest",
	"owner_kpp":      "doc.owner_kpp_suggest",
}
