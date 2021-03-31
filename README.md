# hoji

A small platform I am trying to make

## Setup / Instructions
`client` - frontend
1. Navigate to the `client` folder
1. Run `npm install` to install dependencies
1. Run `npm start` to start the application at `localhost:3000`

`server` - api
1. Navigate to the `server` folder
1. Run `go get` to install dependencies
1. Create a `.env` file with the following structure:
    ```
    MONGO_URI=...:
    ```
1. Run `go run cmd/api/main.go` to start the application at `localhost:8080`