import express from 'express'
import cors from'express'
let app=express()
app.use(express.json())
app.use(cors())

let users=[]
app.get('/users',(req,res)=>{
    res.send("hello")
})

app.post('/users',(req,res)=>{
    let n_user=req.body
    users.push(n_user)
    res.send("user added successfully")
})

app.put('/users/:id',(req,res)=>{
     let i=req.params.id
})

app.delete('/users',(req,res)=>{
    
})

app.listen(5000,()=>{
    console.log("server is running on 5000")
})
