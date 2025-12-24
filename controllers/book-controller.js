const {UserModel, BookModel} = require('../models')
const IssuedBook = require('../dtos/book-dto')

// method 1 
// const getAllBooks = () => {

// }

// const getSingleBookById = () => {

// }

// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }

// method 2

// router.get('/', (req,res) => {
//     res.status(200).json({
//         success : true,
//         data : books
//     })
// })

exports.getAllBooks = async (req,res) => {
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success : false,
            message : "No book found in the System"
        })
    }
    res.status(200).json({
        success : true,
        data : books
    })
}

// router.get('/:id', (req,res) => {
//     const {id} = req.params; 
//     const book = books.find((each) => each.id === id)

//     if(!book){
//         return res.status(404).json({
//             message : false,
//             message : `Book not found for ID ${id}`
//         })
//     }
  
//     res.status(200).json({
//         success : true,
//         data : book

//     })
// })
exports.getSingleBookById = async (req,res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book not found for Id ${id}`
        })
    }

    res.status(200).json({
        success : true,
        data : book
    })
}

// router.get('/issued/for-users', (req,res) => {
//     // const issuedBooks = books.filter((each) => each.issued === true)

//     const usersWithIssuedBooks = users.filter((each) => {
//         if(each.issuedBook){
//             return each
//         }
//     })

//     const issuedBooks = [];
    
//     usersWithIssuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook)
        
//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book);
    
//     })
//     if(!issuedBooks === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No book issued Yet"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     })

// })
exports.getAllIssuedBooks = async (req,res) => {
    const users = await UserModel.find({
        issuedBook : {$exists : true},
    }).populate("issuedBook")

    const issuedBooks = users.map((each) => {
        return new IssuedBook(each);
    });

    if(!issuedBooks.length === 0){
        return res.status(404).json({
            success : false,
            message : `No book issued Yet`
        })
    }

    res.status(200).json({
        success : true,
        data : issuedBooks
    })
}

// router.post('/', (req,res) => {
//     const {id, name, author, genre, price, publisher} = req.body;

//     // check all the required fields are available or not
//     if(!id || !name || !author || !genre || !price || !publisher){
//         return res.status(400).json({
//             success : false,
//             message : `Please provide all the required fields`
//         })
//     }

//     // check if the book already present / exist
//     const book = books.find((each) => each.id === id)
//     if(book){
//         return res.status(409).json({
//             success : false,
//             message : `Book already exist for ID ${id}`
//         })
//     }
    
//     // if all the test pass, then create the new book
//     // add the new book in the array
//     books.push({id, name, author, genre, price, publisher})
//     res.status(201).json({
//         success : true, 
//         message : `new book added successfully by ID ${id}` 
//     })
// })

exports.addNewBook = async (req, res) => {
    const {data} = req.body;
    
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide all the data to add new book"
        })
    }

    await BookModel.create(data);
    // res.status(201).json({
    //     success : true,
    //     message : "Book Added Successfully",
    //     data : data
    // })

    const allBooks = await BookModel.find();
    res.status(201).json({
        success : true,
        message : "Book Added Successfully",
        data : allBooks
    })

}

// router.put('/:id', (req,res) => {
//     const {id} = req.params;
//     const {data} = req.body;

//     // check if the book exist
//     const book = books.find((each) => each.id === id)
//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `Book not found for ID ${id}`
//         })
//     }

//     // Object.assign(books, data)

//     // using spread operator
//     const updatedBook = books.map((each) => {
//         if(each.id === id){
//             return {...each, ...data}
//         }

//         return each
//     })

//     res.status(200).json({
//         success : true,
//         data : updatedBook,
//         message : `Book updated successfully for ID ${id}`
//     })
// })
exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide data to update book"
        })
    }

    // check if the book exists
    const book = await BookModel.find(id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book not found for ID ${id}`
        }) 
    } 

   /** //method 1
    // update the book details
    Object.assign(book, data);
    await book.save();

    res.status(200).json({
        success : true,
        message : "Book updated successfully",
        data : book
    })

    */ 
   
    // method 2
    const updateBook = await BookModel.findOneAndUpdate(
        {_id : id},
        data,
        {new : true}
    ); 

    if(!updateBook){
        return res.status(404).json({
            success : false,
            message : `Book not found for Id ${id}`
        })
    }

    res.status(200).json({
        success : true,
        message : "Book added successfully",
        data : updateBook  
    })
}


// router.delete('/:id', (req,res) => {
//     const {id} = req.params;

//     // check if the book exist or not
//     const book = books.find((each) => each.id === id);

//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `Book not found for ID ${id}`
//         })
//     }

//     // if book exist, filter it out from existing books array
//     const updatedBooks = books.filter((each) => each.id !== id);

//     // 2nd method instead of filter using indexOf(id_index) and slice(index, deleteCount)
//     // const index = books.indexOf(book)
//     // books.splice(index, 1);


//     res.status(200).json({
//         success : true,
//         data : updatedBooks,
//         // data : books,
//         message : `Book deleted successfully for ID ${id}`
//     })
// })

exports.deleteBookById = async (req, res) => {
    const {id} = req.params;

    // check if the book exists
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book not found for Id ${id}`
        })
    } 

    await BookModel.findByIdAndDelete(id)
        res.status(200).json({
            success : true,
            message : "Book deleted successfully"
        }) 
}

