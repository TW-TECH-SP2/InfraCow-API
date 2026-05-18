import Animais from '../models/Animais.js'
import Fazendas from '../models/Fazendas.js'
import Medicoes from '../models/Medicoes.js'
import connection from '../database/dabase-config.js'

class animalService {
    async getAll(id_usuario) {
        try {
            return await Animais.findAll({
                include: {model: Fazendas, where: {id_usuario}},
            })
        } catch (error) {
            console.log("Erro ao buscar todos os animais: ", error);
        }
    }

    async create({nome_animal, codigo, genero, tipo, raca, peso, idade, id_fazenda, imagem,}) {
        try {
            const novoAnimal = await Animais.create({
                nome_animal,
                codigo, 
                genero, 
                tipo,
                raca,
                peso,
                idade,
                id_fazenda,
                imagem,
            });
            return novoAnimal;
        } catch (error) {
            console.log("Erro ao criar o animal: ", error)
        }
    }

    async delete(id, id_usuario) {
        try {
            const resultado = await connection.transaction(async (transaction) => {
                // 1. Buscar animal
                const animal = await Animais.findOne({
                    where: {id_animal: id},
                    transaction,
                });

                if(!animal) {
                    return { sucesso: false, tipo: 'nao_encontrado' };
                }

                // 2. Validar que a fazenda pertence ao usuário
                const fazenda = await Fazendas.findOne({
                    where: { id_fazenda: animal.id_fazenda, id_usuario },
                    transaction,
                });

                if(!fazenda) {
                    return { sucesso: false, tipo: 'nao_encontrado' };
                }

                // 3. Deletar medições
                const totalMedicoes = await Medicoes.destroy({
                    where: {id_animal: id},
                    transaction,
                });

                // 4. Deletar animal
                await animal.destroy({ transaction });
                
                return { sucesso: true, totalMedicoes, id_animal: id };
            });

            return resultado;
        } catch (error) {
            console.log("Erro ao deleter o animal: ", error)
            return { sucesso: false, tipo: 'erro', mensagem: error.message };
        }
    }

    async update(id, id_usuario, {nome_animal, codigo, genero, tipo, raca, peso, idade, imagem}) {
        try {
            // 1. Buscar animal
            const animal = await Animais.findOne({
                where: { id_animal: id },
            });

            if(!animal) {
                console.log(`Animal com a id ${id} não foi encontrado`)
                return false;
            }

            // 2. Validar que a fazenda pertence ao usuário
            const fazenda = await Fazendas.findOne({
                where: { id_fazenda: animal.id_fazenda, id_usuario },
            });

            if(!fazenda) {
                console.log(`Usuário ${id_usuario} não tem permissão para atualizar este animal`)
                return false;
            }

            await animal.update({nome_animal, codigo, genero, tipo, raca, peso, idade, imagem})

            console.log(`Dados do animal com a id ${id} foram alterados com sucesso!`)
            return true;
        } catch (error) {
            console.log("Erro ao atualizar o animal: ", error)
            return false;
        }
    }

    async getOne(id, id_usuario) {
        try {
            // 1. Buscar animal
            const animal = await Animais.findOne({
                where: {id_animal: id},
            })

            if(!animal) {
                console.log(`Animal com a id ${id} não foi encontrado`)
                return null;
            }

            // 2. Validar que a fazenda pertence ao usuário
            const fazenda = await Fazendas.findOne({
                where: { id_fazenda: animal.id_fazenda, id_usuario },
            });

            if(!fazenda) {
                console.log(`Usuário ${id_usuario} não tem permissão para acessar este animal`)
                return null;
            }

            return animal;
        } catch (error) {
            console.log("Erro ao buscar esse animal: ", error)
            return null;
        }
    }

    async getByFazendaId(id_fazenda, id_usuario) {
        try {
            const animais = await Animais.findAll({
                where: {id_fazenda},
                include: [
                    {
                        model: Fazendas,
                        where: {id_usuario},
                        attributes: [],
                    },
                    {
                        model: Medicoes,
                        attributes: ["temp", "datahora"],
                        limit: 1,
                        order: [["datahora", "DESC"]],
                    },
                ],
            });

            return animais.map(a => ({
                id: a.id,
                nome_animal: a.nome_animal,
                genero: a.genero || "-",
                temperatura: a.medicoes?.[0]?.temp ?? 0,
            }));
        } catch (error) {
            console.log("Erro ao buscar animais por fazenda", error);
            return [];
        }
    }
}

export default new animalService();