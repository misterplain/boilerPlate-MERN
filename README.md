### To do list for boilerPlate

## User authentication

[x] once site is deployed, update whitelist in cors options on backend
[x] logout functionality
[x] implement material ui login form with yup and formik
[x] user model on backend will be (username, email, password,  cartItems, favorites, orderHistory, isAdmin, isUser, isDeleted)
[x] take userdata from github/facebook/github to create a userObject, allow user to modify their account details under user Settings 
[x] JWT authentication
[] refresh token functinality, refresh stored in localstorage, new access token/refresh provided by server


## Admin

1. [x] Create/Edit/Delete collections
2. [x] Create/Edit/Delete items / stock
3. [x] Create/Edit/Delete reviews
4. [] Create/Edit/Delete users
5. [x] Create/Edit/Delete orders
6. [] Advances search for orders (order number and email address)

## User

1. [x] Add / Remove items to cart
2. [x] Add / Remove Favorites
3. [x] Rate and review various items
4. [x] Place order, see and edit order in account settings
5. [] Edit profile information, add profile photo
6. [x] View order history, cancel order when in "production" status

## Guest

1. [x] Add / Remove items to cart
4. [x] Place order, receive orderId and confirmation email

## Item 

1. [x] collectionId, photos, title, description, longDescription, alt, stock, reviews(ratings), isFeatured, isDisplayed

## MISC

1. [] placing or cancelling and order changes the backend stock information
2. [x] Photo carousel on each item
3. [x] sort functionality on products page / collections (price high to low, most reviewed, highest rated)
4. [] consider adding password reset functionality
5. [] Sort items on main page for featured items
6. [x] cards on main page linking to shop with collectionId as search filter
7. [] rate limiting for the backend 
8. [x] when user goes back to homepage it triggers fetchProducts()
9. [] customer cannot add to an order the available stock
10. [x] when you confirm an order, if anything is out of stock it will reply with error 
11. [] user can report a review which removes it and puts it back in moderation
12. [x] cloudinary formating to maintain aspect ratio, central cropping
13. [x] replace 1-5 ratings with stars
14. [x] within ratings, get average rating based on X reviews
15. [] When you load the Shop screen, isFeatured products will display before any filterQueries are sent
16. [] Favorites screen
17. [] New/edit review, set rating to star icon hover
18. [] Full order details screen
19. [] Admin moderate reviews show product info 
20. [] Admin toggle whether reviews need to be moderated 
21. [] Back button from new/edit product back to collections
22. [] Collections as dropdown menu 
23. [] Refresh on product/collections page, re-load if nothing in redux state
24. [] consider: Admin level styling 



