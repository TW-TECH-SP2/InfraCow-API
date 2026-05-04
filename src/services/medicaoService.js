import Medicoes from "../models/Medicoes.js";

class MedicaoService {
    async getAll() {
        try {
            return await Medicoes.findAll();
        } catch (error) {
            console.log("Erro ao buscar medições", error)
        }
    }

    async create({ temp, datahora, id_animal}) {
        try {
            const novaMedicao = await Medicoes.create({
                temp,
                datahora,
                id_animal,
            })

            return novaMedicao;
        } catch (error) {
            console.log("Erro ao criar medição", error)
        }
    }

    async delete(id) {
        try {
            const deletado = await Medicoes.destroy({ where: { id }})

            if(!deletado) {
                console.log(`Medição com a id ${id} não encontrada`)
            } else {
                console.log(`Medição com a id ${id} foi deletada`)
            }
        } catch (error) {
            console.log("Erro ao deleter medição", error)
        }
    }

    async update(id, { temp, datahora, id_animal}) {
        try {
            const atualizado = await Medicoes.update(
                {temp, datahora, id_animal},
                {where: {id} }
            );

            if(!atualizado) {
                console.log(`Medição com a id ${id} não foi encontrada`)
            } else {
                console.log(`Medição com a id ${id} atualizada com sucesso`);
            }
        } catch (error) {
            console.log("Erro ao atualizar medição", error)
        }
    }

    async getOne(id) {
        try {
            console.log("Buscando medição com ID: ", id);

            const medicao = await Medicoes.findOne({ where: {id} })

            if(!medicao) {
                console.log(`Medição com a id ${id} não foi encontrada`)
            }
            return medicao;
        } catch (error) {
            console.log("Erro ao buscar essa medição", error)
        }
    }
}

export default new MedicaoService;