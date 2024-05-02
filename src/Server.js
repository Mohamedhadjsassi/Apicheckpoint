const express = require('express');
const User = require('./models/User');
const asyncHundler = require('./asyncHundler');
const app=express()

// Connecting to the database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))

app.use(express.json());

const userRouter=express.Router

// Route to retrieve all users

const getusers=asyncHundler(async (req, res) => {
    const data = await User.find();
    res.status(200).json({status:"success",data:data});
  })

  userRouter.get("/users" , getusers) ;



  // Route to create a new user

const adduser=asyncHundler(async (req,res)=>{
    const data = await User.create(req.body);
    res.status(200).json({status:"success",data:data});
})

userRouter.post("/new-users" , adduser) ;

// Route to update  users

const updateusers=asyncHundler(async (req, res) => {
    const data = await User.findOneAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({status:"success",data:data});
  })

  userRouter.put("/users/:id" , updateusers) ;

  // Route to delete  users

const deleteusers=asyncHundler(async (req, res) => {
    const data = await User.findOneAndDelete(req.params.id);
    res.status(200).json({status:"success",data:data});
  })

  userRouter.delete("/users/:id" , deleteusers) ;



  //error handeling
app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})
app.use((err,req, res,next) => {
    res.json({status:"error",message:err.message})
})




mongoose.connection.once('open', () => {

    app.listen(8000, () => {
        console.log('server is running on port 8000');
    })
})
