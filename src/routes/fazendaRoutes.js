import express from 'express'
import fazendaController from '../controllers/fazendaController.js'
import Auth from '../middlewares/Auth.js'

const fazendaRoutes = express.Router();

/**
 * @swagger
 * /fazendas:
 *   get:
 *     summary: Listar todas as fazendas do usuário
 *     tags: [Fazenda]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fazendas
 *       401:
 *         description: Token inválido
 */
fazendaRoutes.get("/fazendas", Auth.Autorization,fazendaController.buscarTodasFazendas);

/**
 * @swagger
 * /fazendas:
 *   post:
 *     summary: Criar nova fazenda
 *     tags: [Fazenda]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_fazenda
 *               - rua
 *               - bairro
 *               - cidade
 *               - CEP
 *               - numero
 *               - id_usuario
 *             properties:
 *               nome_fazenda:
 *                 type: string
 *               rua:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               CEP:
 *                 type: string
 *               numero:
 *                 type: string
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Fazenda criada com sucesso
 *       400:
 *         description: Campos obrigatórios faltando
 */
fazendaRoutes.post("/fazendas", Auth.Autorization, fazendaController.registrarFazenda);

/**
 * @swagger
 * /fazendas/{id}:
 *   delete:
 *     summary: Deletar fazenda
 *     tags: [Fazenda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Fazenda deletada com sucesso
 *       404:
 *         description: Fazenda não encontrada
 */
fazendaRoutes.delete("/fazendas/:id", Auth.Autorization, fazendaController.deletarFazenda);

/**
 * @swagger
 * /fazendas/{id}:
 *   put:
 *     summary: Atualizar fazenda
 *     tags: [Fazenda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:\n *               nome_fazenda:\n *                 type: string
 *               rua:\n *                 type: string
 *               bairro:\n *                 type: string
 *               cidade:\n *                 type: string
 *               CEP:\n *                 type: string
 *               numero:\n *                 type: string
 *     responses:
 *       200:\n *         description: Fazenda atualizada com sucesso\n *       404:\n *         description: Fazenda não encontrada
 */
fazendaRoutes.put("/fazendas/:id", Auth.Autorization, fazendaController.atualizarFazenda);

/**
 * @swagger
 * /fazendas/{id}:
 *   get:
 *     summary: Buscar fazenda por ID
 *     tags: [Fazenda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da fazenda
 *       404:
 *         description: Fazenda não encontrada
 */
fazendaRoutes.get("/fazendas/:id", Auth.Autorization, fazendaController.buscarFazendaPorID);

export default fazendaRoutes;