package service

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/url"
	"strconv"
)

func executeQuery(s *Webserver, q Query) Response {

	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(q); err != nil {
		log.Fatalf("Error encoding Subquery: %s", err)
	}

	// Perform the search request.
	res, err := s.elastic.Search(
		s.elastic.Search.WithContext(context.Background()),
		s.elastic.Search.WithIndex(s.config.Elastic.Index),
		s.elastic.Search.WithBody(&buf),
		s.elastic.Search.WithTrackTotalHits(true),
		s.elastic.Search.WithPretty(),
	)
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	r := Response{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	return r
}

func buildSuggestWheelsets(params url.Values) Query {

	var size string
	if size = params.Get("size"); size == "" {
		size = "5"
	}

	sq := SuggestQuery{}
	sq.Source = []string{"doc.id", "doc.payload.owner_name", "doc.payload.owner_inn", "doc.payload.owner_kpp", "doc.payload.storage_number"}
	sq.Suggest = make(map[string]Subquery)

	for field, lookup := range suggestFieldsLookup {
		if value, ok := params[field]; ok {
			suggest := Subquery{
				"prefix": value[0],
				"completion": Subquery{
					"field":           lookup,
					"size":            size,
					"skip_duplicates": true,
				},
			}
			sq.Suggest[field] = suggest
		}
	}

	return &sq
}

func buildFilterQuery(params url.Values) Query {

	var source []string
	if verbose := params.Get("verbose"); verbose == "" {
		source = []string{
			"doc.id",
			"doc.payload",
		}
	}

	searchAfterTimestamp := params.Get("search_after_timestamp")
	searchAfterID := params.Get("search_after_id")
	searchAfterScore := params.Get("search_after_score")

	fmt.Println("searchAfterID", searchAfterID)

	var size string
	if size = params.Get("size"); size == "" {
		size = "10"
	}

	q := SimpleQuery{}

	sortQuery := []Subquery{
		Subquery{"_score": map[string]string{
			"order": "desc",
		}},
		Subquery{"doc.updatedAt": map[string]string{
			"order": "desc",
		}},
		Subquery{"_id": map[string]string{
			"order": "desc",
		}},
	}

	q.Sort = sortQuery

	if len(source) > 0 {
		q.Source = source
	}

	if searchAfterTimestamp != "" && searchAfterID != "" && searchAfterScore != "" {
		q.SearchAfter = []string{searchAfterScore, searchAfterTimestamp, searchAfterID}
	}

	var err error
	q.Size, err = strconv.Atoi(size)
	if err != nil {
		log.Fatalf("Error type cast: %s", err)
	}

	for field, _ := range wheelsetFieldsLookup {
		if value, ok := params[field]; ok {
			lookup := field + ".keyword"
			//if field == "id" {
			//	lookup = "doc." + field + ".keyword"
			//}
			filter := Subquery{
				"term": map[string]string{
					lookup: value[0],
				},
			}

			q.Query.Bool.Filter = append(q.Query.Bool.Filter, filter)
		}
	}

	return &q
}

func buildMatchQuery(params url.Values) Query {

	var source []string
	if verbose := params.Get("verbose"); verbose == "" {
		source = []string{
			"doc.id",
			"doc.payload",
		}
	}

	searchAfterTimestamp := params.Get("search_after_timestamp")
	searchAfterID := params.Get("search_after_id")
	searchAfterScore := params.Get("search_after_score")

	var size string
	if size = params.Get("size"); size == "" {
		size = "10"
	}

	q := SimpleQuery{}

	sortQuery := []Subquery{
		Subquery{"_score": map[string]string{
			"order": "desc",
		}},
		Subquery{"doc.updatedAt": map[string]string{
			"order": "desc",
		}},
		Subquery{"_id": map[string]string{
			"order": "desc",
		}},
	}

	q.Sort = sortQuery

	if len(source) > 0 {
		q.Source = source
	}

	if searchAfterTimestamp != "" && searchAfterID != "" && searchAfterScore != "" {
		q.SearchAfter = []string{searchAfterScore, searchAfterTimestamp, searchAfterID}
	}

	var err error
	q.Size, err = strconv.Atoi(size)
	if err != nil {
		log.Fatalf("Error type cast: %s", err)
	}

	//rangeQuery := Subquery{"range": Subquery{
	//	"doc.updatedAt": map[string]string{},
	//}}

	for field, lookup := range wheelsetFieldsLookup {
		if value, ok := params[field]; ok {
			//if field == "datefrom" {
			//	rangeQuery["range"].(Subquery)["doc.updatedAt"].(map[string]string)["gte"] = value[0]
			//} else if field == "dateto" {
			//	rangeQuery["range"].(Subquery)["doc.updatedAt"].(map[string]string)["lte"] = value[0]
			if field == "id" || field == "location" || field == "owner" {
				queryMatch := Subquery{"match": Subquery{
					lookup: Subquery{
						"query":    value[0],
						"operator": "and",
					},
				}}
				//if field == "id" {
				//	field = "doc." + field + ".test2"
				//} else {
				//	field = fmt.Sprintf("doc.payload.%s", field)
				//}
				queryMatchPhrase := Subquery{"match_phrase": Subquery{
					field: Subquery{
						"query": value[0],
						//"slop": 3,
						"boost": 2,
					},
				}}
				queryMatchPhrasePrefix := Subquery{"match_phrase_prefix": Subquery{
					field: Subquery{
						"query":          value[0],
						"max_expansions": 50,
						"boost":          2,
					},
				}}
				q.Query.Bool.Should = append(q.Query.Bool.Should, queryMatch)
				q.Query.Bool.Should = append(q.Query.Bool.Should, queryMatchPhrase)
				q.Query.Bool.Should = append(q.Query.Bool.Should, queryMatchPhrasePrefix)
			} else {
				filter := Subquery{
					"term": map[string]string{
						lookup: value[0],
					},
				}
				q.Query.Bool.Filter = append(q.Query.Bool.Filter, filter)
			}
		}
	}
	//q.Query.Bool.Must = append(q.Query.Bool.Must, rangeQuery)

	return &q
}

//func (s *Webserver) suggestWheelsets(c *gin.Context) {
//
//	params := c.Request.URL.Query()
//	if len(params) == 0 {
//		c.JSON(200, "Success")
//		return
//	}
//
//	suggestQuery := buildSuggestWheelsets(params)
//	res := executeQuery(s, suggestQuery)
//	if res == nil {
//		return
//	}
//
//	json, _ := json.Marshal(res["suggest"])
//	output := map[string]interface{}{
//		"suggestions": string(json),
//	}
//
//	c.JSON(200, output)
//}

func (s *Webserver) fetchWheelsets(c *gin.Context) {

	params := c.Request.URL.Query()
	if len(params) == 0 {
		c.JSON(200, "Success")
		return
	}

	filterQuery := buildFilterQuery(params)
	matchQuery := buildMatchQuery(params)

	res := executeQuery(s, filterQuery)
	if res == nil {
		return
	}

	fmt.Println("res:", res)

	count := res["hits"].(map[string]interface{})["total"]
	if count.(map[string]interface{})["value"].(float64) == 0 {
		res = executeQuery(s, matchQuery)
		count = res["hits"].(map[string]interface{})["total"]
	}

	results := make([]map[string]interface{}, 0)
	hits := res["hits"].(map[string]interface{})["hits"].([]interface{})
	for _, hit := range hits {
		value := hit
		results = append(results, value.(map[string]interface{}))
	}

	json, _ := json.Marshal(results)
	output := map[string]interface{}{
		"data":  string(json),
		"count": count,
	}

	c.JSON(200, output)
}

func (s *Webserver) totalCount(c *gin.Context) {

	// Perform the count request.
	res, err := s.elastic.Count(
		s.elastic.Count.WithContext(context.Background()),
		s.elastic.Count.WithIndex(s.config.Elastic.Index),
		s.elastic.Count.WithPretty(),
	)
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}
	if r == nil {
		return
	}

	c.JSON(200, r["count"])
}
