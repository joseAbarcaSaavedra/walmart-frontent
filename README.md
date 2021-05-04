# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.



## RUN IN DOCKER

### RENAME .env.example to .env and replace REACT_APP_API_URL to real walmart-backend URL/PORT

Install all dependencies
`yarn install`

Build Code
`yarn build`

Build Docker image and Tag
`docker build -t jabarca/walmart-frontend .`

Run Docker image on port 8081
`docker run -p 8081:3000 --it jabarca/walmart-frontend`