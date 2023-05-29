const express = require("express")
const router = express.Router()

const {getAllRecipe, createRecipe, updateRecipe, deleteRecipe} = require("../service/recipe")

router.get("/recipe", async(req, res) => {
    const recipe = await getAllRecipe()
    res.json(recipe)
})

router.post("/recipe", async(req, res) => {
    const {nome,descricao,tempoPreparo, user} = req.body
    const recipe = await createRecipe(nome, descricao, tempoPreparo, user)
    res.json(recipe)
})

router.put("/recipe/:id", async (req, res) => {
    const id = Number(req.params.id)
    const {nome,descricao,tempoPreparo, user} = req.body
    const updatedRecipe = await updateRecipe(id, nome, descricao, tempoPreparo, user)
    res.json(updatedRecipe)
})

router.delete("/recipe/:id", async (req, res) => {
    const id = Number(req.params.id)
    const deletedRecipe = await deleteRecipe(id)
    res.json(deletedRecipe)
})

module.exports = router