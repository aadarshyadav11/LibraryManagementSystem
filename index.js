const express = require('express')
// const {users} = require('./data/users.json');
// const {books} = require('./data/books.json');

const usersRouter = require('./routes/users.js');
const booksRouter = require('./routes/books.js')

const app = express();

//middleware to pass JSON bodies
// this allows us to handle JSON data sent in requests 
app.use(express.json())

app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "This is home page"    
    })
})

// app.all('*',(req,res) => {
//     res.status(500).json({
//         message: "Not implemented Yet !!"
//     })
// })



const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);    
})