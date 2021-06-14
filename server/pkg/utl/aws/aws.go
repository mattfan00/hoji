package aws

import (
	"mime/multipart"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/mattfan00/hoji/server/pkg/utl/config"
)

type Interface interface {
	AddObject(*multipart.FileHeader, string, string) (string, error)
}

type Service struct {
	S3Uploader *s3manager.Uploader
}

func Init() *Service {
	sess, err := session.NewSession(
		&aws.Config{
			Region: aws.String(config.Values.AwsRegion),
			Credentials: credentials.NewStaticCredentials(
				config.Values.AwsAccessKeyId,
				config.Values.AwsSecretAccessKey,
				"", // a token will be created when the session it's used.
			),
		},
	)

	if err != nil {
		panic(err)
	}

	service := &Service{
		S3Uploader: s3manager.NewUploader(sess),
	}

	return service
}
