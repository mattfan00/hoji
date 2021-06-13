package aws

import (
	"bytes"
	"fmt"
	"mime/multipart"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func (s Service) AddObject(file *multipart.FileHeader, bucket string, directory string) (string, error) {
	f, err := file.Open()

	if err != nil {
		return "", err
	}

	defer f.Close()

	size := file.Size
	buffer := make([]byte, size)

	f.Read(buffer)
	fileBytes := bytes.NewReader(buffer)
	path := fmt.Sprintf("%s/%d-%s", strings.TrimRight(directory, "/"), time.Now().Unix(), file.Filename)

	result, err := s.S3Uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		ACL:    aws.String("public-read"),
		Key:    aws.String(path),
		Body:   fileBytes,
	})

	if err != nil {
		return "", err
	}

	return result.Location, nil
}
