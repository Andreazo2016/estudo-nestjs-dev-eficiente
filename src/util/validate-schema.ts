import * as Joi from 'joi'

interface ValidateSchemaParams {
    schema: Joi.Schema;
    data: object;
}

export class ValidateSchema {

    static validate({ schema, data }: ValidateSchemaParams) {
        const response = schema.validate(data)
        if (response.error && response.error.details.length > 0) {
            const messages = response.error.details.map(e => e.message).join(" | ")
            throw new Error(messages)
        }
    }
}