import Usuarios from '../models/Usuarios.js'
import bcrypt from 'bcrypt';

class usuarioService {
    async Create(nome, email, senha) {
        try {
            const hash = await bcrypt.hash(senha, 10);
            const novoUsuario = await Usuarios.create({
                nome,
                email,
                senha: hash,
            });
            return novoUsuario;
        } catch (error) {
            console.log("Erro ao criar o usuário: ", error)
        }
    }

    async getOne(email) {
        try {
            const usuario = await Usuarios.findOne({ where: { email }});
            return usuario;
        } catch (error) {
            console.log("Erro ao buscar o email do usuário: ", error)
        }
    }

    async getById(id) {
        try {
            const usuario = await Usuarios.findByPk(id);
            return usuario;
        } catch (error) {
            console.log("Erro ao buscar usuário por ID:", error)
        }
    }

    async update(id, dadosAtualizados) {
        try {
            const usuario = await Usuarios.findByPk(id);

            if (!usuario) {
                console.log("Usuário não encontrado");
            }

            await usuario.update(dadosAtualizados);
        } catch(error) {
            console.log("Erro ao atualizar usuário: ", error)
        }
    }

    async delete(id) {
        try {
            const usuario = await Usuarios.findByPk(id);

            if(!usuario) {
                console.log("Usuário não encontrado");
            }

            await usuario.destroy();
            return true;
        } catch(error) {
            console.log("Erro ao deleter usuário: ",error)
        }
    }
}

export default new usuarioService();