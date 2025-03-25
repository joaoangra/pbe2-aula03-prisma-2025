const express = require('express');
const router = express.Router();

const Cliente = require('./controllers/cliente');
const Pedido = require('./controllers/pedido');
const Telefone = require('./controllers/telefone')

router.get('/', (req, res) => {
    res.json({ titulo: 'SNOOPY PetShop API' });
});

router.post('/clientes', Cliente.create);
router.get('/clientes', Cliente.read);
router.patch('/clientes/:id', Cliente.update);
router.delete('/clientes/:id', Cliente.remove);

router.post('/pedidos', Pedido.create);
router.get('/pedidos', Pedido.read);
router.patch('/pedidos/:id', Pedido.update);
router.delete('/pedidos/:id', Pedido.remove);

router.get('/telefones', Telefone.read);
router.post('/telefones', Telefone.create);
router.patch('/telefones/:id', Telefone.update);
router.delete('/telefones/:id', Telefone.remove);


module.exports = router;
