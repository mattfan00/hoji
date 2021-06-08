package entry

import (
	//"server/pkg/utl/aws"
	//"server/pkg/utl/config"
	"net/http"
	"net/http/httptest"
	"server/pkg/utl/server"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreate(t *testing.T) {
	r := server.New()

	ts := httptest.NewServer(r)
	defer ts.Close()

	res, err := http.Get(ts.URL)

	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, 200, res.StatusCode)
}
