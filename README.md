# Harvest Development

## Set up
  - git clone https://gitlab.com/titanht/harvest
  - cd harvest
  - npm install
  - Copy environment file
    - [Linux] cp .example.env .env
    - [Windows] copy .example.env .env
  - npm intall - nyc

<hr />

## Starting
  - Install mongodb
  - Start mongodb with terminal / cmd
    - [Linux] sudo service mongod start
    - [Windows] C:\Program Files\MongoDB\Server\{VERSION}\bin\mongo.exe
  - npm run start

<hr />

## Testing
  - npm run test

<hr />

## Conventions

### Styling convention
Bare layout

html<br/>
&nbsp;&nbsp;body<br/>
&nbsp;&nbsp;&nbsp;&nbsp;div#__next<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;div.layout<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nav<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;div.content<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;footer<br/>

#### All compnents go under div.content
- to apply styling prefix z root container with name of file<br/>
  Eg. SignupComponent<br/>

SignUpComponent.js
```html
<div className="signup-component">  
  <div>Sign Up related code</div>
</div>
```
signupcomponent.scss<br/>
```css
/* Styles that apply globally*/
body {
  /* Body styles */
}
.content {
  /* Make components start at top */
  justify-content: start;
}

/* Styles that locally apply to SignupComponent */
.signup-component {
  div {
    /* Some nested styling */
  }
}
```

### Controller method names
  - exports.index  [Fetch all records      eg. GET /api/users]
  - exports.show   [Fetch specific records eg. GET /api/users/:id]
  - exports.update [Update a record.       eg. PATCH /api/users/:id]
  - exports.store  [Create a record        eg. POST /api/users]
  - exports.delete [Delete a record        eg. DELETE /api/users/:id]

### Api return format
{<br/>
&nbsp;&nbsp;status: 'success'|'fail'|'error',<br/>
&nbsp;&nbsp;message: 'Message of operation',<br/>
&nbsp;&nbsp;data:&nbsp;&nbsp; {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;availableData<br/>
&nbsp;&nbsp;}<br/>
}<br/>
#### For status constants use lig/constants.js

<hr />

## Component creation conventions
  #### To create components it's a gud practice to make is as much modular as possible. Lets take a sample for creating components related to Login.<br/>
  #### Let's assume a login page has custom card and custome button so z followin structure will be used

pages/<br/>
&nbsp;&nbsp;login.js<br/>
src/<br/>
&nbsp;&nbsp;components<br />
&nbsp;&nbsp;&nbsp;&nbsp;login/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LoginCard.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logincard.scss<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LoginButton.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loginbutton.scss<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LoginComponent.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logincomponent.scss<br/>

&nbsp;&nbsp;containers/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;LoginContainer.js<br />

<hr />

## Folder and file naming conventions
### For files and folders inside ***api***
1. Suffix all files according to purpose<br/>
Eg. models *Model.js, *.Controller.js, *Routes.js, *Middleware.js

2. Use PascalCaseNaming for model files<br/>
Eg. models/UserModel.js models/product/ProductModel.js

3. Use camelCaseNaming for ramaining files and folders<br />
Eg. controllers/testController.js, controllers/auth/loginController.js, controllers/auth/signUpController.js, routes/user/userRoutes.js<br/>

### For files and folders inside ***pages***
1. Use lowercase letters to name files and folders<br/>
Eg. index.js, login.js, products/view.js
2. Use - separated words<br/>
Eg. view-products.js user-list/index.js

### For files and folders inside ***src***
1. Use camelCase to name all folders and files inside store<br/>
Eg. components components/login store/actions/counterActions.js

2. Use PascalCase naming for files inside container and components<br/>
Eg. components/layout/Layout.js components/login/LoginComponent.js

3. use lowercase naming for stylesheet files<br/>
Eg. logincard.scss

4. match stylesheet file name with corresponding Component file
Eg. LoginComponent.js logincomponent.scss

3. Except layout folder suffix all components inside components/ folder with Component.js<br/>
Eg. LoginComponent.js, SignupComponent.js

4. Suffix every file inside container with Container.js<br/>
Eg. LoginContainer.js

5. Suffix files inside store according to purpose<br/>
Eg. actions/counterActions.js reducers/counterReducer.js


<hr/>

## Vscode extensions
  - press Ctrl+P and install using z ff commands<br/>
  #### Essential
  - ext install esbenp.prettier-vscode
  - ext install dbaeumer.vscode-eslint
  #### Optional
  - ext install steoates.autoimport
  - ext install NuclleaR.vscode-extension-auto-import
  - ext install christian-kohler.npm-intellisense
  - ext install dsznajder.es7-react-js-snippets
  - ext install shd101wyy.markdown-preview-enhanced
  - ext install naumovs.color-highlight
  
<hr />

## Directory Structure

api / <br/>
&nbsp;&nbsp;controllers /<br/>
&nbsp;&nbsp;middleware /<br/>
&nbsp;&nbsp;models /<br/>
&nbsp;&nbsp;routes /<br/>
&nbsp;&nbsp;&nbsp;&nbsp;index.js <br/>
lib /<br/>
pages /<br/>
&nbsp;&nbsp;_app.js<br/>
&nbsp;&nbsp;_document.js<br/>
&nbsp;&nbsp;index.js
src /<br/>
&nbsp;&nbsp;components/<br/>
&nbsp;&nbsp;containers/<br/>
&nbsp;&nbsp;store/<br/>
&nbsp;&nbsp;theme/<br/>
utils/<br/>
&nbsp;&nbsp; AppError.js<br/>
&nbsp;&nbsp;catchAsync<br/>
.env<br/>
.env.example<br/>
next.config.js<br/>
nodemon.json<br/>
server.js<br/>

<hr />

## File and Directory details

| File/Direactory    | Description                         |
| -------------------|------------------------------------ |
| api                | folders related to server side code |
| src                | Folder related to client side code <br/>includes components containers store theme                            |
| src/components     | React components                     |
| src/containers     | React containers to connect ui with redux|
| src/store          | React store contains actions reducers<br/> and store |
| src/theme          | Sass theme to set global colors and fonts|
| utils/AppError     | Global error handler to handle and format<br/> errors both for development and production mode|
| utils/catchAsync   | Asyncrhronous error handler to catch async<br/> errors during api calls|
| .env               | Environment variables not pushed to version <br/> control|
| .env.example       | Environment variables that has to be set by <br/>each developr|
| nodemon.json       | Nodemon configuration                 |
| server.js          | Main entry point for whole application|
| lib/constants.js   | Repeatedly used constants housed in one place|

LICENSE private<br/>
Harvet &#169; 2019
