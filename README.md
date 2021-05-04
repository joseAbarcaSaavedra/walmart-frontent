# Hi
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## RUN IN LOCAL

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## RUN IN DOCKER

### RENAME .env.example to .env and replace REACT_APP_API_URL to real walmart-backend URL/PORT

1. Install dependencies
`yarn install`

2. Build code
`yarn build`

3. Build docker image and tag
`docker build -t jabarca/walmart-frontend .`

4. Run docker image on port 8081 
`docker run -p 8081:80 --it jabarca/walmart-frontend`



### `yarn test`

Launches the test runner in the interactive watch mode.\

