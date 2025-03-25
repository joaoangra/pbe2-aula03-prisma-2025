const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { clienteId, numero, tipo } = req.body;

        const telefone = await prisma.telefone.create({
            data: {
                clienteId,
                numero,
                tipo
            }
        });

        res.status(201).json(telefone);
    } catch (e) {
        res.status(400).json({ error: 'Erro ao criar telefone', details: e });
    }
};

const read = async (req, res) => {
    try {
        const telefones = await prisma.telefone.findMany({
            include: {
                cliente: true,  
            }
        });

        res.json(telefones);
    } catch (e) {
        res.status(500).json({ error: 'Erro ao buscar telefones', details: e });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero, tipo } = req.body;

        const telefone = await prisma.telefone.update({
            where: { id: Number(id) },
            data: {
                numero,
                tipo
            }
        });

        res.status(202).json(telefone);
    } catch (e) {
        res.status(400).json({ error: 'Erro ao atualizar telefone', details: e });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.telefone.delete({
            where: { id: Number(id) }
        });

        res.status(204).end();  
    } catch (e) {
        res.status(400).json({ error: 'Erro ao deletar telefone', details: e });
    }
};

module.exports = {
    create,
    read,
    update,
    remove
};
