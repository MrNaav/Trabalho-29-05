const prisma = require("../db/prisma")

const getAllUsuario = () => {
    return prisma.user.findMany()
}

const createUsuario = (nome, email, senha) => {
    return prisma.user.create({
        data:{
            nome,
            email,
            senha
        }
    })
}

const updateUsuario = (id, nome, email, senha) => {
    return prisma.user.update({
        where:{id},
        data:{nome, email, senha}
    })
}

const deleteUsuario = (id) => {
    return prisma.user.delete({
        where:{id}
    })
}

module.exports = {
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}
