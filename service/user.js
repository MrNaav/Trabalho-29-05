const prisma = require("../db/prisma")
const bcrypt = require ("bcrypt")

const getAllUsuario = () => {
    return prisma.user.findMany()
}

const createUsuario = ({email, senha, nome}) => {
    const senhaCriptografada = bcrypt.hashSync(senha, 10)
    return prisma.user.create({
        data:{
            nome,
            email,
            senha:senhaCriptografada
        }
    });
}

const updateUsuario = (id, {nome, email, senha}) => {
    return prisma.user.update({
        where:{id},
        data:{nome, email, senha}
    });
};

const deleteUsuario = (id) => {
    return prisma.user.delete({
        where:{id}
    })
}

const getUserbyEmail = async (email) => {
    return prisma.user.findFirst({
        where: {email}
    })
}

module.exports = {
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUserbyEmail,
}