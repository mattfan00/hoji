# server

## Directory Structure
`cmd` - contains code for starting the applications (the `main` files)

`pkg/api` - contains the code to start and handle the API routes
- Each API route has a service associated with it (ex. `UserService` and `EntryService`)
- Each service has the business logic associated with the respective routes
- Each service is injected with the running MongoDB connection

`pkg/utl` - contains helper packages and models
