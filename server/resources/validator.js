// Validator for controllers

const { isUuid } = require('uuidv4');

class Validator {
    uuid (id, entityName) {
        if (!id) {
            return {
                code: `${entityName}Id is missing`,
                message: `Request must contain ${entityName} ID`
            };
        }

        if (!isUuid(id)) {
            return {
                code: `Incorrect ${entityName} ID`,
                message: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} ID must be UUID`
            };
        }

        return 0;
    }
}

const validator = new Validator();

module.exports = validator;
