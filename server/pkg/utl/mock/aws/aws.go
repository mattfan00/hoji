package aws

import (
	"mime/multipart"

	"github.com/stretchr/testify/mock"
)

type AwsMock struct {
	mock.Mock
}

func (m *AwsMock) AddObject(file *multipart.FileHeader, bucket string, directory string) (string, error) {
	args := m.Called(bucket, directory)

	return args.String(0), args.Error(1)
}
