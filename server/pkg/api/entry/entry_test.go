package entry

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mattfan00/hoji/server/pkg/utl/server"
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
