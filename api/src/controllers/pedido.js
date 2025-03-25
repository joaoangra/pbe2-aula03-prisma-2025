const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { clienteId, produto, qtd, preco, subTotal } = req.body;
        
        const pedido = await prisma.pedido.create({
            data: {
                clienteId,
                produto,
                qtd,
                preco,
                subTotal: subTotal || (qtd * preco)  
            }
        });

        res.status(201).json(pedido);
    } catch (e) {
        res.status(400).json({ error: 'Erro ao criar pedido', details: e });
    }
};

const read = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                cliente: true,  
            }
        });
        res.json(pedidos);
    } catch (e) {
        res.status(500).json({ error: 'Erro ao buscar pedidos', details: e });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { produto, qtd, preco, subTotal } = req.body;

        const pedido = await prisma.pedido.update({
            where: { id: Number(id) },
            data: {
                produto,
                qtd,
                preco,
                subTotal: subTotal || (qtd * preco)  
            }
        });

        res.status(202).json(pedido);
    } catch (e) {
        res.status(400).json({ error: 'Erro ao atualizar pedido', details: e });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.pedido.delete({
            where: { id: Number(id) }
        });

        res.status(204).end();  
    } catch (e) {
        res.status(400).json({ error: 'Erro ao deletar pedido', details: e });
    }
};

module.exports = {
    create,
    read,
    update,
    remove
};
