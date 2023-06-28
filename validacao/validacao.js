const Joi = require('joi');

class Validation {
    validateColaborador(colaborador) {
        const schema = Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            senha: Joi.string().required(),
            timestamp: Joi.date().timestamp()
        });
        return schema.validate(colaborador);
    }

    validatePet(pet) {
        const schema = Joi.object({
            nome: Joi.string().required(),
            idade: Joi.number().required(),
            porte: Joi.string().valid('Pequeno', 'Medio', 'Grande'),
            tipo: Joi.string().valid('Silvestre', 'Domestico'),
            nomeCliente: Joi.string().required(),
            peso: Joi.number().required(),
            timestamp: Joi.date().timestamp()
        });
        return schema.validate(pet);
    }

    validateAgendamento(agendamento) {
        const schema = Joi.object({
            pet: Joi.string().required(),
            tipoAgendamento: Joi.string().valid('Consulta', 'Tosa', 'Banho'),
            data: Joi.string().required(),
            nomeColaborador: Joi.string().required(),
            colaboradorId: Joi.string().required(),
            timestamp: Joi.date().timestamp()
        });
        return schema.validate(agendamento);
    }
}

module.exports = Validation;