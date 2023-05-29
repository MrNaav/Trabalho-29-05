const prisma = require("../db/prisma")

const getAllRecipe = () => {
    return prisma.recipe.findMany()
}

const createRecipe = (nome, descricao, tempoPreparo, user) => {
    return prisma.recipe.create({
        data:{
            nome,
            descricao,
            tempoPreparo,
            user
        }
    })
}

const updateRecipe = (id, nome, descricao, tempoPreparo, userId) => {
    return prisma.receita.update ({
        where:{id},
        data:{nome, descricao, tempoPreparo, userId}
    })
}

const deleteRecipe = (id) => {
    return prisma.recipe.delete ({
        where:{id}
    })
}

module.exports = {
    getAllRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
}