const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth");

const {getAllUsuario, createUsuario, updateUsuario, deleteUsuario, getUserbyEmail} = require("../service/user");

router.get("/user", async(req,res) => {
    const user = await getAllUsuario()
    res.json(user)
})

router.post("/user", async (req,res) =>{
    const newuser = await createUsuario(req.body)
    res.json(newuser)
  } )

  router.put("/user", auth, async(req,res) =>{
    const userId=Number(req.user.id) 
    const updatedUser=await updateUsuario(userId,req.body)
    res.json(updatedUser)
  } )

  router.delete("/user/:id", auth, async(req,res) =>{
    const userId=Number(req.params.id)
    const deletedUser=await deleteUsuario(userId,req.body)
    res.json(deletedUser)
  } )

  router.post("/login", async(req,res) => {
    const{ email, senha} = req.body;
    try{
        const user = await getUserbyEmail(email);
        if(!user) return res.status(401).json({ message: "Não autorizado"});
        
        const eIgual = bcrypt.compareSync(senha, user.senha);
        if(!eIgual) return res.status(401).json({message:"Não autorizado"});

        const payload = {
            user: {
              id: user.id,
              email: user.email
            }
          }

        const token = jwt.sign(payload, process.env.SECRET);

        res.json({ token });
    } catch(erro) {
        return res.status(400).send("Credenciais inválidas")
    }
  })

module.exports = router