package errors

import (
	"fmt"
	"net/http"

	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-playground/validator"
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

func getValidationMessage(tag string, param string) string {
	switch tag {
	case "required":
		return "Field is required but was not received"
	case "email":
		return "Email must be valid"
	case "min":
		return fmt.Sprintf("Must be at minimum %s characters", param)
	}
	return ""
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

	case validator.ValidationErrors:
		code = http.StatusBadRequest

		var errMessages []validationMessage

		for _, valError := range customError {
			newValidationMessage := validationMessage{
				Field: valError.Field(),
				Error: getValidationMessage(valError.ActualTag(), valError.Param()),
			}

			errMessages = append(
				errMessages,
				newValidationMessage,
			)
		}

		resp.Message = errMessages

	case validation.Errors:
		code = http.StatusBadRequest
		resp.Message = "this is from ozzo validation"
	}

	c.JSON(code, resp)
}

type CustomValidator struct {
	Validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.Validator.Struct(i); err != nil {
		return err
	}
	return nil
}
