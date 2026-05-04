import fazendaService from "../services/fazendaService.js"

const registrarFazenda = async (req,res) =>{
    try{
        const {nome_fazenda, rua, bairro, cidade, CEP, numero, id_usuario, imagem}= req.body
        if(!imagem){
            imagem = "Null"
        }
        if(!nome_fazenda || !rua || !bairro || !cidade || !CEP || !numero || !id_usuario){
            return res.status(400).json({error: "Campos Obrigatorios Não Respondidos"})
        }
       const novaFazenda =  await fazendaService.create(nome_fazenda, rua, bairro, cidade, CEP, numero, id_usuario, imagem)
        return res.status(201).json({ message: `Fazenda ${nome_fazenda} criada com sucesso`,fazenda : novaFazenda}) 


    }catch(error){
        return res.status(500).json({ error: "Erro Interno de Servidor"})
    }
}

const deletarFazenda = async (req,res) =>{
    try{
        const {id, id_usuario} = req.params
        const apagado = await fazendaService.delete(id, id_usuario)
        if(apagado){
            return res.status(204).json({message: `Fazenda ${id} Deletado Com Sucesso`})
        }
        else{
            return res.status(400).json({message: "Não Foi Possivel Deletar a Fazenda"})
        }
    }
    catch(error){
        return res.status(500).json({error: "PROBLEMAS DE SERVIDOR"})}
    
}

const atualizarFazenda = async (req,res) =>{
    try{
         const id = req.params
        if(!id){
           return res.status(400).json({message: "ID INVALIDO"})
        }

        const {nome_fazenda, rua, bairro, cidade, CEP, numero, id_usuario, imagem} = req.body
        const atualizado = await fazendaService.update(id,nome_fazenda, rua, bairro, cidade, CEP, numero, id_usuario, imagem)
        if(atualizado){
            return res.status(200).json({message:`${nome_fazenda} foi atualizada com sucesso`})
        }
        else{
            return res.status(404).json({message:"FAZENDA NAO ENCONTRADA"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"PROBLEMA COM SERVIDOR"})
        
    }
}

const buscarTodasFazendas = async (req,res) =>{
    try{
        const id_usuario = req.params
        const fazendas =  await fazendaService.getAll(id_usuario)
        if(fazendas){
            return res.status(200).json({ fazendas:fazendas})
        }
        else{
            return res.status(404).json({
                message: "Nenhuma Fazenda Encontrada Para Esse Usuario"
            })
        }

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({error: "PROBLEMA COM SERVIDOR"})
    }
}

const buscarFazendaPorID = async (req,res) =>{
   try{ const {id, id_usuario}= req.params
    if(!id){
        return res.status(400).json({message:"ID invalido"})
    }
    const fazenda = await fazendaService.getOne(id,id_usuario)
    if(fazenda){
        return res.status(200).json({ fazenda : fazenda})
    }
    else{
        return res.status(404).json({message:"Fazenda Nao Encontrada"})
    }
}
catch(error){
    console.log(error)
    return res.status(500).json({error:"PROBLEMA COM SERVIDOR"})
}
}