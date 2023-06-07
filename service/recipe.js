const prisma = require("../db/prisma")

const getAllRecipe = () => {
    return prisma.recipe.findMany()
}

const createRecipe =  async ({nome, descricao, tempoPreparo}, {id}) => {
    return prisma.recipe.create({
        data:{
            nome,
            descricao,
            tempoPreparo,
            userId: id
        }
    });
}

const updateRecipe = async (id, {nome, descricao, tempoPreparo}) => {
    return prisma.recipe.update({
        where:{id},
        data:{nome, descricao, tempoPreparo}
    });
};

const deleteRecipe = (id) => {
    return prisma.recipe.delete({
        where:{id: id}
    })
}

module.exports = {
    getAllRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
}