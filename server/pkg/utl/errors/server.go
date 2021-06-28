package errors

import (
	"net/http"
	"sort"

	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/labstack/echo/v4"
)

type response struct {
	Type    interface{} `json:"type,omitempty"`
	Message interface{} `json:"message"`
}

type validationMessage struct {
	Field string `json:"field"`
	Error string `json:"error"`
}

func CustomHTTPErrorHandler(err error, c echo.Context) {
	var (
		code int
		resp response
	)

	code = http.StatusInternalServerError
	resp = response{
		Message: err.Error(),
	}

	switch customError := err.(type) {

	case *echo.HTTPError:
		code = customError.Code
		resp.Message = customError.Message

	case validation.Errors:
		code = http.StatusBadRequest
		resp.Message = customError

		var fields []string
		for field := range customError {
			fields = append(fields, field)
		}

		sort.Strings(fields)

		var errMessages []validationMessage

		for _, field := range fields {
			newValidationMessage := validationMessage{
				Field: field,
				Error: customError[field].Error(),
			}

			errMessages = append(
				errMessages,
				newValidationMessage,
			)
		}

		resp.Message = errMessages
	}

	c.JSON(code, resp)
}
