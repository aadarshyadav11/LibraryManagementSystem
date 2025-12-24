const {UserModel, BookModel} = require('../models')

// router.get('/', (req,res) => {
//     res.status(200).json({
//         success : true,
//         data : books
//     })
// })

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    if(!users || users.length === 0){
        return res.status(404).json({
            success : false,
            message : "Users not found"
        })
    }

    res.status(200).json({
        success : true,
        data : users
    })
}

// router.get('/:id', (req,res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id === id)

//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `User not found for Id ${id}`
//         })
//     }

//     res.status(200).json({
//         success : true,
//         data : user
//     })
// })
exports.getSingleUserById = async (req, res) => {
    const {id} = req.params;
     
    const user = await UserModel.findById(id);
    // const user = await UserModel.findById({_id : id});
    // const user = await UserModel.findOne({_id : id});

    if(!user){
        return res.status(404).json({
            success : false,
            message : `User Not found for Id ${id}`
        })
    }

    res.status(200).json({
        success : true,
        data : user
    })
}

// router.post('/', (req,res) => {
    
//     const {id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    
//     // check all the required fields are available or not
//     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//         return  res.status(400).json({
//             success : false,
//             message : "Please provide all the required fields"
//         })
//     }

//     // check if the user already exits
//     const user = users.find((each) => each.id === id)
//     if(user){
//         return res.status(409).json({
//             success : false,
//             message : `User already exist with ID ${id}`
//         })
//     }

//     // if all the check pass, create the user
//     // and add as a new user in the array
//     users.push({ id, name, surname, email, subscriptionType, subscriptionDate });
//     res.status(201).json({
//         success : true,
//         message : `User created successfully with ID ${id}`
//     }) 
// })

exports.addNewUser = async (req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide the data to add a new user"
        })
    }

    await UserModel.create(data);

    const allUsers = await UserModel.find();
    res.status(201).json({
        success : true,
        message : "User added successfully",
        data : allUsers
    })
}


// router.put('/:id', (req,res) => {
//     const {id} = req.params;
//     const {data} = req.body;

//     // check if the user exists
//     const user = users.find((each) => each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `User not found for ID ${id}`
//         })
//     }

//     // Object.assign(user, data)

//     // with spread operator
//     const updateUser = users.map((each) => {
//         if(each.id === id){
//             return {...each, ...data}
//         }

//         return each
//     })

//     res.status(200).json({
//         success : true,
//         data : updateUser,
//         message :  `user updated successfully with ID ${id}`
//     })

// })
exports.updateUserById = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;
    
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide data to update the user"
        })
    }
    // check if user exists
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : `user not found for Id ${id}`
        })
    }

    // method 1
    // Object.assign(user, data);
    // await user.save();

    // res.status(200).json({
    //     success : true,
    //     message : "user updated successfully",
    //     data : data
    // })

    // method 2
    const updatedUser = await UserModel.findOneAndUpdate({_id : id}, data, {new : true})
    if(!updatedUser){
        return res.status(404).json({
            success : true,
            message : `User not found for Id ${id}`
        })
    }

    res.status(200).json({
        success : true,
        message : "user updated successfully",
        data : updatedUser
    })

}


// router.delete('/:id', (req,res) => {
//     const {id} = req.params;
    
//     // check if the user exists 
//     const user = users.find((each) => each.id === id)

//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `User not found with ID ${id}`
//         })
//     }

//     //if user exist, filter it out from existing users array
//     const updatedUsers = users.filter((each) => each.id !== id)

//     // 2nd method instead of filter using indexOf(id_index) and slice(index, deleteCount)
//     // const index = users.indexOf(user)
//     // users.splice(index, 1);

//     res.status(200).json({
//         success : true,
//         data : updatedUsers,
//         // data : users,
//         message : `User deleted successfully by ID ${id}`
//     }) 
// })

exports.deleteUserById = async (req, res) => {
    const {id} = req.params;

    // check user exists
    const user = await UserModel.findById(id)
    if(!user){
        return res.status(404).json({
            success : false,
            message : `user not found for Id ${id}`
        })
    } 

    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
        success : true,
        message : "user deleted successfully"
    })
}

// router.get('/subscription-details/:id', (req,res) => {
//     const {id} = req.params;

//     const user = users.find((each) => each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for ID ${id}`
//         })
//     }
     
//     // extract the subscription details
//     const getDateInDays = (data = '') => {
//         let date;
//         if(data){
//             date = new Date(data);
//         }
//         else{
//             date = new Date();
//         }
//         let days = Math.floor(date / (1000 * 60 * 60 * 24));
//         return days;

//     }

//     const subscriptionType = (date) => {
//         if(user.subscriptionType === "basic"){
//             date = date + 90;
//         }
//         else if(user.subscriptionType === "standard"){
//             date = date + 180;
//         }
//         else if(user.subscriptionType === "premium"){
//             date = date + 365;
//         }
//         return date;
//     } 

//     // subscription expiration calculation
//     // january 1, 1970 UTC // milliseconds

//     let returnDate = getDateInDays(user.issuedDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired : subscriptionExpiration < currentDate,
//         subscriptionDaysLeft : subscriptionExpiration - currentDate,
//         daysLeftForExpiration : returnDate - currentDate,
//         returnDate : returnDate < currentDate ? "Book is overdue" : returnDate,
//         fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//     }

//     res.status(200).json({
//         success: true,
//         data : data 
//     })
// })


exports.getSubscriptionDetailsById = async (req, res) => {
    const {id} = req.params;

    const user = await UserModel.findById(id);
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

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
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
}