const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const z = require("zod")

const {getAllRecipe, createRecipe, updateRecipe, deleteRecipe} = require("../service/recipe")
const { user } = require("../db/prisma")
const prisma = require("../db/prisma")

const recipeSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  tempoPreparo: z.string()
})

const recipeIdSchema = z.number().int();
const recipePutSchema = z.number().int();

router.get("/recipe", auth, async(req, res) => {
  try {
    const user=req.user;
    const recipe= await getAllRecipe(user.email);
    res.json(recipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }
  }
  
});

router.post("/recipe", auth, async (req,res) =>{
    try {
      recipeSchema.parse(req.body)
      const newrecipe = await createRecipe(req.body, req.user)
      res.json(newrecipe)
    } catch(error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          message: error.errors,
        });
      } res.status(500).json({
        message: "server error",
      });
    }
  } )

  router.put("/recipe/:id", auth, async(req,res) =>{
    try {
      const id = recipePutSchema.parse(Number(req.params.id))
      const userId = Number(req.user.id);
      const validRecipe = await prisma.recipe.findFirst({
        where: {
          id,
          userId
        }
      })

      if(!validRecipe) {
        return res.status(400)
          .send({ message: "not found"})
      }

      const updatedRecipe=await updateRecipe(id,req.body)
      res.json(updatedRecipe)
    }catch(error){
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          message: error.errors,
        });
      } res.status(500).json({
        message: "server error",
      });
    }
  } )

router.delete("/recipe/:id", auth, async(req,res) =>{
  try{
    const id = recipeIdSchema.parse(Number(req.params.id))
    const deletedRecipe = await deleteRecipe(id)

    res.json(deletedRecipe)
  } catch(error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    } res.status(500).json({
      message: "server error",
    });
  }
} )

module.exports = router