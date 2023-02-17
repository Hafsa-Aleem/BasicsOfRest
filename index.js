const express = require('express')
const app = express()
const uuid = require('uuid')

const members = [{
    id:1,
    name:"John",
    email:"abc@gmail",
    status:'active'
},{
    id:1,
    name:"John",
    email:"abc@gmail",
    status:'active'
},{
    id:2,
    name:"Joh",
    email:"abc@gmail",
    status:'active'
},{
    id:3,
    name:"Jorden",
    email:"abc@gmail",
    status:'active'
}]

app.use(express.json())

//show the data of all the users
app.get("/showAllUser",(req,res)=>{
    res.status(200).json(members)
})

//show the data of specific user
app.get("/showUser/:id",(req,res)=>{
    const id = req.params.id

    const user = members.filter(member=> member.id === parseInt(id))
     user.length !==0 ? res.status(200).json(user) : res.status(200).json({msg:"user not found"})
    res.status(200).json(user)
   
})

///adding a user
app.post('/addUser',(req,res)=>{
    // const name = req.body.name
    // const email = req.body.email
  
    const {email,name} = {...req.body}  //another method
    members.push({id:uuid.v4(),name,email})
    res.status(200).json(members)
})

//delete a user
app.delete("/deleteUser/:uid",(req,res)=>{
    const id = parseInt(req.params.uid)
    const found = members.some(member => member.id === id)
    if(found){
    const results = members.filter(member => member.id !== id)
    res.status(200).json(results)
    }else{
        res.status(400).json({msg:`no member found with the id of ${id}`})
    }
})

//update a user
app.put("/updateUser/:uid",(req,res)=>{
    const id = parseInt(req.params.uid)
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found)
    {
      const updMember = req.body
      members.forEach(member =>{
        if(member.id === parseInt(req.params.id))
        {
            member.name = updMember.name
            member.email = updMember.email
        }
      })
     res.status(200).json(members)
    }
    else{
        res.status(400).json({msg:`no member found with the id of ${id}`})
    }
})



const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})