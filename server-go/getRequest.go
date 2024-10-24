package main

import (
	"encoding/json"
	"io"
	"net/http"
)

func getRequest(endpoint string) (map[string]interface{}, error) {
	response, err := http.Get(endpoint)
	handleError(err)
	defer response.Body.Close()

	content, err := io.ReadAll(response.Body)
	handleError(err)

	var result map[string]interface{}
	err = json.Unmarshal(content, &result)
	if err != nil {
		return nil, err
	}
	
	return result, nil
}
