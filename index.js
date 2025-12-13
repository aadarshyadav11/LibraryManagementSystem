const express = require('express')

const app = express();



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