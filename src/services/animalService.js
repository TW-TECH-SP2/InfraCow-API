import Animais from '../models/Animais.js'
import Fazendas from '../models/Fazendas.js'
import Medicoes from '../models/Medicoes.js'

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
            const animal = await Animais.findOne({
                where: {id},
                include: {model: Fazendas, where: {id_usuario}},
            });

            if(!animal) {
                console.log(`Animal com a id ${id} não encontrado ou não pertence ao usuário`)
            }

            await animal.destroy();
            console.log(`Animal com a id ${id} foi excluído com sucesso!`)
        } catch (error) {
            console.log("Erro ao deleter o animal: ", error)
        }
    }

    async update(id, id_usuario, {nome_animal, codigo, genero, tipo, raca, peso, idade, imagem}) {
        try {
            const animal = await Animais.findOne({
                where: { id },
                include: { model: Fazendas, where: {id_usuario} },
            })

            if(!animal) {
                console.log(`Animal com a id ${id} não foi encontrado ou não pertence ao usuário`)
            }

            await animal.update({nome_animal, codigo, genero, tipo, raca, peso, idade, imagem})

            console.log(`Dados do animal com a id ${id} foram alterados com sucesso!`)
            return animal;
        } catch (error) {
            console.log("Erro ao atualizar o animal: ", error)
        }
    }

    async getOne(id, id_usuario) {
        try {
            const animal = await Animais.findOne({
                where: {id},
                include: {model: Fazendas, where: {id_usuario}},
            })

            if(!animal) {
                console.log(`Animal com a id ${id} não foi encontrado ou não pertence ao usuário`)
            }
            return animal;
        } catch (error) {
            console.log("Erro ao buscar esse animal: ", error)
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