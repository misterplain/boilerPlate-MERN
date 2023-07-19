### To do list for boilerPlate

## User authentication

1. [] once site is deployed, update whitelist in cors options on backend
2. [] once site is deployed, integrate facebook login which requires https
3. [x] implement material ui login form with yup and formik
4. [x] user model on backend will be (username, email, password,  cartItems, favorites, orderHistory, isAdmin, isUser, isDeleted)
5. [x] take userdata from github/facebook/github to create a userObject, allow user to modify their account details under user Settings 
6. [x] JWT authentication
7. [] refresh token functinality, refresh stored in localstorage, new access token/refresh provided by server
8. [x] logout functionality

## Admin

1. [x] Create/Edit/Delete collections
2. [x] Create/Edit/Delete items / stock
3. [] Create/Edit/Delete reviews
4. [] Create/Edit/Delete users
5. [x] Create/Edit/Delete orders

## User

1. [x] Add / Remove items to cart
2. [x] Add / Remove Favorites
3. [] Rate and review various items
4. [x] Place order, see and edit order in account settings
5. [] Edit profile information
6. [x] View order history

## Guest

1. [x] Add / Remove items to cart
4. [x] Place order, receive orderId and confirmation email

## Item 

1. [x] collection, photos, title, description, longDescription, alt, stock, reviews(ratings), isFeatured

## MISC

1. [] making a purchase changes the stock information
2. [x] Photo carousel on each item
3. [] sort functionality on products page / collections (price high to low, most reviewed, highest rated)
4. [] consider adding password reset functionality
5. [] Sort items on main page for featured items
6. [] cards on main page linking to collection, add and edit collection photo
7. [] rate limiting for the backend 
8. [x] when user goes back to homepage it triggers fetchProducts()
9. [] customer cannot add to an order the available stock
10. [] when a user cancels an order, the stock is added to backend
11. [] user can report a review which removes it and puts it back in moderation
12. [x] cloudinary formating to maintain aspect ratio, central cropping
13. [] replace 1-5 ratings with stars
14. [] within ratings, get average rating based on X reviews
15. [] when you confirm an order, if anything is out of stock it will reply with error 


