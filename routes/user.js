const express = require("express")
const router = express.Router()

const {getAllUsuario, createUsuario, updateUsuario, deleteUsuario} = require("../service/user")

router.get("/user", async(req,res) => {
    const user = await getAllUsuario()
    res.json(user)
})

router.post("/user", async (req,res) =>{
    const newuser = await createUsuario(req.body)
    res.json(newuser)
  } )

  router.put("/user/:id", async(req,res) =>{
    const userId=Number(req.params.id) 
    const updatedUser=await updateUsuario(userId,req.body)
    res.json(updatedUser)
  } )

  router.delete("/user/:id", async(req,res) =>{
    const userId=Number(req.params.id)
    const deletedUser=await deleteUsuario(userId,req.body)
    res.json(deletedUser)
  } )

module.exports = router