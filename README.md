# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# CCNY ZERO (CSC 322 software engineering)
Group project for ***CSC 322 @CCNY***
This is CCNY Zero , a graduate program management system. 

## Live Website Link
[CCNY Zero Live](https://csc-322-project.web.app/)


## Website Demo (Video)
[![Watch the video](https://i.imgur.com/3XP8mBC.png)](https://www.youtube.com/watch?v=FFdOIdtwPKg)

## Group Members Team E
- Haroon Syed
- Christopher Lall
- Andrew Persaud
- Tufayel Ahmed
- Josue Flores

## Running Locally
First clone the github repo and go into the project directory. Then,
```bash
npm install
npm start dev # run the react.js project in development mode
```
Open http://localhost:3000 to view it in the browser.

*If package error appears run these before running* `npm start`.
```bash
npm install react-icons
npm install react-select --save
npm install @material-ui/core
npm install react scripts --save
```

## Technologies Used
 - Firebase Authentication
 - Firebase Hosting
 - Firebase Firestore Database
 - React.js
 - Node.js

## Repository Structure
- `src`
  - `signIn/` : A page that lets a user log into the website
  - `signUp/` : A page which allows people to sign up as a student or an instructor
  - `aboutUs/` : About us page js code
  - `forgotPassword/` : Allows the user to change the password if needed
  - `instructorView/` : The page for an instructor when logging in
  - `error/` : 404 error page .js code
  - `studentView/` : The page the student sees after logging in
  - `registrars/` : The registrar/super user page when logging in
  - `home/` : The main page for the logged in user 
  - `navbar/` : The code for the navigation bar and its may states
  - `reSubmitPass/` : The code that verifies the correct password when a user signs up
  - `components/` : tab files
  - `contexts/` : Has all the authorization & authentication implementation for creating an account, logging in and signing out.
  - `App.css/`: styling sheet for App.js
  - `Apptest.js/`: Render
  - `App.js/`: Routes to specific path
  - `firebase.js`: Connection from firebase to React.js
  - `index.css`:styling sheet for index.js
  - `index.js`: Browser router and ReactDOM render
  - `reportWebVitals.js`: Performance measure (if wanted)
  - `setupTest.js`: Import DOM nodes


## Default Users
 1. admin account - username lol69@gmail.com, password: test1234
 
## Project Documentation
1. [Phase 1 Report : Software Requirements & Description](https://github.com/NishanthPrajith/Csc-322-Final-Project/blob/a050d190daded7f6b248075960b23d0b98ee545a/Phase1report.docx.pdf)
2. [Phase 2 Report : Design report](https://github.com/NishanthPrajith/Csc-322-Final-Project/blob/cc86ebd76973b3b0b5832b8b7972f3d7d5ea4c88/CSC32200_GES_Phase2.pdf)
