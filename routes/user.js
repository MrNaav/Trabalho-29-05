const express = require("express")
const router = express.Router()

const {getAllUsuario, createUsuario, updateUsuario, deleteUsuario} = require("../service/user")

router.get("/user", async(req,res) => {
    const user = await getAllUsuario()
    res.json(user)
})

router.post("/user", async(req,res) => {
    const {nome,email,senha} = req.body
    const user = await createUsuario(nome, email, senha)
    res.json(user)
})

router.put("/user/:id", async (req, res) => {
    const id = Number(req.params.id)
    const {nome,email,senha} = req.body
    const updatedUser = await updateUsuario(id, nome, email, senha)
    res.json(updatedUser)
})

router.delete("/user/:id", async (req, res) => {
    const id = Number(req.params.id)
    const deletedUser = await deleteUsuario(id)
    res.json(deletedUser)
})

module.exports = router