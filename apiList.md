# DevTinder APIs
authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- PATCH /profile/view
- GET /profile/edit
- PATCH /profile/password -- // forget password API

connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
----- POST /request/send/:status/:userId ---

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
---- POST /request/review/:status/:requestId ---

userRouter
- GET /requests/received
- GET /connections
- GET /feed - Gets you the profiles of other users on the platform



Status: ignore, interested, accepted, rejected
