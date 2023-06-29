const Joi = require('joi');

class Validation {
    validacaoClientes(cliente) {
        const schema = Joi.object({
            nome: Joi.string().required().messages({
                'any.required': 'O campo "nome" é obrigatório.'
            }),
            email: Joi.string().email().required().messages({
                'any.required': 'O campo "email" é obrigatório.',
                'string.email': 'O campo "email" deve conter @ e ser um email válido.'
            }),
            senha: Joi.string().min(8).required(),
            timestamp: Joi.date().timestamp()
        });

        return schema.validate(cliente);
    }

    validacaoProdutos(produto) {
        const schema = Joi.object({
            nome: Joi.string().required(),
            medida: Joi.string().required(),
            timestamp: Joi.date().timestamp()
        });
        return schema.validate(produto);
    }

    validacaoPedidos(pedido) {
        const schema = Joi.object({
            usina: Joi.string().required(),
            produto: Joi.string().valid(),
            quantidade: Joi.number().min(1).required(),
            preco: Joi.number().min(0.01).required(),
            destino: Joi.string().required(),
            clienteId: Joi.string().required(),
            timestamp: Joi.date().timestamp()
        });
        return schema.validate(pedido);
    }
}

module.exports = Validation;