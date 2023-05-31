const express = require("express");

const userRouter = require("./routes/user")
const recipeRouter = require("./routes/recipe")
const authRouter = require("./routes/auth")

const port = 8000;
const server = express();


server.use(express.json())

server.use(userRouter)
server.use(recipeRouter)
server.use(authRouter)

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})