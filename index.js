const express = require('express')

const app = express();



app.get('/',(req,res)=>{
    res.status(200).json({
        message : "This is home page"    
    })
})


const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);    
})