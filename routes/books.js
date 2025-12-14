const express = require('express')
const {books} = require('../data/books.json')

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

module.exports = router;