package errors

import (
	"errors"
	"regexp"
)

func IsUsername(value interface{}) error {
	s, _ := value.(string)
	if !regexp.MustCompile("^[a-zA-Z_]*$").MatchString(s) {
		return errors.New("must contain letters, numbers, or '_'")
	}

	return nil
}

func IsType(value interface{}) error {
	s, _ := value.(string)
	if s != "post" && s != "thought" {
		return errors.New("must be a valid entry type")
	}

	return nil
}
