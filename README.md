# hoji

[![Build Status](https://travis-ci.com/mattfan00/hoji.svg?branch=master)](https://travis-ci.com/mattfan00/hoji)

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
    PG_URI=...
    
    ACCESS_TOKEN_SECRET=...
    REFRESH_TOKEN_SECRET=...

    AWS_REGION=...
    AWS_ACCESS_KEY_ID=...
    AWS_SECRET_ACCESS_KEY=...
    ```
1. Run `go run cmd/api/main.go` to start the application at `localhost:8080`
