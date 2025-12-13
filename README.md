# Library Management System
- This is a library management API Backend for the management of users and the books

## routes and the endpoints

## /users
GET: get all the list of the users in the system
POST: create/register a new user in the system

## /users/{is}
GET: get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID(check if the user still has an issued book && is their any fine/penalty to be collected)

## /users/subscription-details/{id}
GET: get a user subscription details
    >> date of subscription
    >> valid till date ?
    >> fine if any ?

## /books
GET: get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: get a book by its ID
PUT: Update a book by its ID
DELETE: delete a book by its ID

## /books/issued
GET: get all the issued books

## /books/issued/withFine
GET: get all issued books with their fine amount

## subscription types
    >> basic (3 month)
    >> standard (6 month)
    >> premium (12 month)

- if a user missed the renewal date, then user should be collected with ₹100
- if a user misses his subscription, then user is expected to pay ₹100
- if a user misses both renewal and subscription, then the collected amount should be ₹200


## commands
- npm init
- npm i express   (dependency)
- npm i nodemon --save-dev  (dependency with flag)
- 