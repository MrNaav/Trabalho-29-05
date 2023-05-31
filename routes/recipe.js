const express = require("express")
const router = express.Router()

const {getAllRecipe, createRecipe, updateRecipe, deleteRecipe} = require("../service/recipe")

router.get("/recipe", async(req, res) => {
    const recipe = await getAllRecipe()
    res.json(recipe)
})

router.post("/recipe", async (req,res) =>{
    const newrecipe = await createRecipe(req.body)
    res.json(newrecipe)
  } )

  router.put("/recipe/:id", async(req,res) =>{
    const recipeId=Number(req.params.id) 
    const updatedRecipe=await updateRecipe(recipeId,req.body)
    res.json(updatedRecipe)
  } )

router.delete("/recipe/:id", async(req,res) =>{
  const recipeId=Number(req.params.id)
  const deletedRecipe=await deleteRecipe(recipeId,req.body)
  res.json(deletedRecipe)
} )

module.exports = router