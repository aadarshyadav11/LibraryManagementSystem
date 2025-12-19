const express = require('express')
const {books} = require('../data/books.json')
const {users} = require('../data/users.json')

const router = express.Router();


/**
 * Route : /books
 * Method : GET
 * Description : get all the list of the books in the system
 * Access : public
 * Parameter : none
 */

router.get('/', (req,res) => {
    res.status(200).json({
        success : true,
        data : books
    })
})


/**
 * Route : /books/:id
 * Method : GET
 * Description : get books by its ID in the system
 * Access : public
 * Parameter : none
 */
router.get('/:id', (req,res) => {
    const {id} = req.params; 
    const user = books.find((each) => each.id === id)

    if(!user){
        return res.status(404).json({
            message : false,
            message : `Book not found for ID ${id}`
        })
    }
  
    res.status(200).json({
        success : true,
        data : user

    })
})


/**
 * Route : /books
 * Method : POST
 * Description : Create / register a new book in the system
 * Access : public
 * Parameter : none
 */

router.post('/', (req,res) => {
    const {id, name, author, genre, price, publisher} = req.body;

    // check all the required fields are available or not
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success : false,
            message : `Please provide all the required fields`
        })
    }

    // check if the book already present / exist
    const book = books.find((each) => each.id === id)
    if(book){
        return res.status(409).json({
            success : false,
            message : `Book already exist for ID ${id}`
        })
    }
    
    // if all the test pass, then create the new book
    // add the new book in the array
    books.push({id, name, author, genre, price, publisher})
    res.status(201).json({
        success : true, 
        message : `new book added successfully by ID ${id}` 
    })
})


/**
 * Route : /books/:id
 * Method : PUT
 * Description : updating a book by their ID
 * Access : public
 * Parameter : ID
 */

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    // check if the book exist
    const book = books.find((each) => each.id === id)
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book not found for ID ${id}`
        })
    }

    // Object.assign(books, data)

    // using spread operator
    const updatedBook = books.map((each) => {
        if(each.id === id){
            return {...each, ...data}
        }

        return each
    })

    res.status(200).json({
        success : true,
        data : updatedBook,
        message : `Book updated successfully for ID ${id}`
    })
})


/**
 * Route : /books/:id
 * Method : DELETE
 * Description : delete a book by their ID
 * Access : public
 * Parameter : ID
 */

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    // check if the book exist or not
    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book not found for ID ${id}`
        })
    }

    // if book exist, filter it out from existing books array
    const updatedBooks = books.filter((each) => each.id !== id);

    // 2nd method instead of filter using indexOf(id_index) and slice(index, deleteCount)
    // const index = books.indexOf(book)
    // books.splice(index, 1);


    res.status(200).json({
        success : true,
        data : updatedBooks,
        // data : books,
        message : `Book deleted successfully for ID ${id}`
    })
})

/**
 * Route: books/issued/for-users
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: None  
 */

router.get('/issued/for-users', (req,res) => {
    // const issuedBooks = books.filter((each) => each.issued === true)

    const usersWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook){
            return each
        }
    })

    const issuedBooks = [];
    
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook)
        
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    
    })
    if(!issuedBooks === 0){
        return res.status(404).json({
            success: false,
            message: "No book issued Yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })

})

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: get all the subscription details of a user by their ID
 * Access: Public
 * Parameter: ID
 */

router.get('/subscription-details/:id', (req,res) => {
    const {id} = req.params;

    const user = users.find((each) => each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        })
    }
     
    // extract the subscription details
    const getDateInDays = (data = '') => {
        let date;
        if(data){
            date = new Date(data);
        }
        else{
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;

    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "basic"){
            date = date + 90;
        }
        else if(user.subscriptionType === "standard"){
            date = date + 180;
        }
        else if(user.subscriptionType === "premium"){
            date = date + 365;
        }
        return date;
    } 

    // subscription expiration calculation
    // january 1, 1970 UTC // milliseconds

    let returnDate = getDateInDays(user.issuedDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate,
        subscriptionDaysLeft : subscriptionExpiration - currentDate,
        daysLeftForExpiration : returnDate - currentDate,
        returnDate : returnDate < currentDate ? "Book is overdue" : returnDate,
        fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data : data 
    })
})

module.exports = router; 