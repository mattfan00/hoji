package model

type User struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Details  struct {
		Pronouns    string `json:"pronouns"`
		Description string `json:"description"`
		Website     string `json:"website"`
	} `json:"details"`
	Entries []string `json:"entries"`
}
