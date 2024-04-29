import { validateSync } from 'class-validator'

export class BaseEntity {

    validateFields(classToValidateRef: any) {
       const errors = validateSync(classToValidateRef)
       if (errors.length > 0) {
        throw new Error(errors.map(erro => erro.value).join(' '))
       }
    }
}