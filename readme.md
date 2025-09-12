- JS Object vs JSON
- Add the express.json() middleware to your app
- Make your signup API dynamic to recieve data from the end user
- Make the user api for fetching the data based on any id
- Difference between Patch and Put
- API - Update a user
- Explore the Mongoose Documentation for model methods
- What are the options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email Id

-Explore schematype options from the documentations
-add required, unique, lowercase, min, minlength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - Put all appropriate validation on each field in schema
- Add timestamps to the userschema
- Add API level validation on patch request & signuppost api
- Data santizing - Add API validation for each build
- Install validator
- Explore validator library function and use validator function for password, email.

- Never trust on req.body
- validate data in signUp API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash and save the user is exrupted password
- Create login API
- compare passwords and throw errors if email or password is invalid

Lec 10 
- install cookie-parser
- just send a dummy cookie to user
- create get/profile api and check if you get the cookie back
- Install jsonwebtoken
- In login api, after email and password validation, create a jwt token and send it to the user in cookie
- read the cookies inside your profile API and find the logged in user
- userAuth middleware
- Add the userAuth middleware in profile API and a new senConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create userSchema method to comparepassword(password)

Lec 11
- Explore tinder APIs
- Create a list of all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request, connection
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST/logout API
- Create PATCH/profile.edit
- Create PATCH/profile/password API ==> forgot password API
- Make you validate all data in every POST, PATCH APIs

Lec 12
- store the connectionrequest in database
- Create a connectionrequestschema
- send connection request api
- proper validation of data
- think of all corner cases
- $or query read about it
- read more about indexes in MongoDb
- Why do we need index in DB?
- What is the advantage and disadvantages of creating indexes?

Lec 13
- 