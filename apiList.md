# DevTinder APIs
authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- PATCH /profile/view
- GET /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter
- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles of other users on the platform



Status: ignore, interested, accepted, rejected
