package model

type AuthToken struct {
	Access  string `json:"access_token"`
	Refresh string `json:"refresh_token"`
}
