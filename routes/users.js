const express = require('express');
const {users} = require('../data/users.json')

const router = express.Router();


/**
 * Route : /users
 * Method : GET
 * Description : get all the list of the users in the system
 * Access : public
 * Parameter : none
 */

router.get('/', (req,res) => {
    res.status(200).json({
        success : true,
        data : users
    })
})

/**
 * Route : /users/:id
 * Method : GET
 * Description : get user by their ID
 * Access : public
 * Parameter : id
 */

router.get('/:id', (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id)

    if(!user){
        return res.status(404).json({
            success : false,
            message : `User not found for Id ${id}`
        })
    }

    res.status(200).json({
        success : true,
        data : user
    })
})

/**
 * Route : /users
 * Method : POST
 * Description : Create / register a new user
 * Access : public
 * Parameter : none
 */

router.post('/', (req,res) => {
    
    const {id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    
    // check all the required fields are available or not
    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return  res.status(400).json({
            success : false,
            message : "Please provide all the required fields"
        })
    }

    // check if the user already exits
    const user = users.find((each) => each.id === id)
    if(user){
        return res.status(409).json({
            success : false,
            message : `User already exist with ID ${id}`
        })
    }

    // if all the check pass, create the user
    // and add as a new user in the array
    users.push({ id, name, surname, email, subscriptionType, subscriptionDate });
    res.status(201).json({
        success : true,
        message : `User created successfully with ID ${id}`
    }) 
})

/**
 * Route : /users/:id
 * Method : PUT
 * Description : updating a user by their ID
 * Access : public
 * Parameter : ID
 */

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    // check if the user exists
    const user = users.find((each) => each.id === id)
    if(!user){
        return res.status(404).json({
            success : false,
            message : `User not found for ID ${id}`
        })
    }

    // Object.assign(user, data)

    // with spread operator
    const updateUser = users.map((each) => {
        if(each.id === id){
            return {...each, ...data}
        }

        return each
    })

    res.status(200).json({
        success : true,
        data : updateUser,
        message :  `user updated successfully with ID ${id}`
    })

})

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : delete a user by their ID
 * Access : public
 * Parameter : ID
 */

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    
    // check if the user exists 
    const user = users.find((each) => each.id === id)

    if(!user){
        return res.status(404).json({
            success : false,
            message : `User not found with ID ${id}`
        })
    }

    //if users exist, filter it out from existing users array
    const updatedUsers = users.filter((each) => each.id !== id)

    // 2nd method instead of filter using indexOf(id_index) and slice(index, deleteCount)
    // const index = users.indexOf(user)
    // users.splice(index, 1);

    res.status(200).json({
        success : true,
        data : updatedUsers,
        // data : users,
        message : `User deleted successfully by ID ${id}`
    }) 
})


module.exports = router;