package entry

import (
	"testing"

	"github.com/mattfan00/hoji/server/pkg/utl/mock/aws"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	//"github.com/stretchr/testify/assert"
)

func TestCreate(t *testing.T) {
	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	cases := map[string]struct {
		currUser model.User
		body     createReq
	}{}

	for name, _ := range cases {
		t.Run(name, func(t *testing.T) {
			entryMock := postgres.EntryMock{}
			awsMock := aws.AwsMock{}

			NewTest(&entryMock, &awsMock)
		})
	}
}
