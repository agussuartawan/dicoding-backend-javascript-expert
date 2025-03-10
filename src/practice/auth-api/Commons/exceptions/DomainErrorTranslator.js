const InvariantError = require("./InvariantError")

const DomainErrorTranslator = {
    translate(error) {
        return DomainErrorTranslator._directories[error.message] || error
    },
}

DomainErrorTranslator._directories = {
    "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
        "cannot create user cause needed property not included",
    ),
    "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
        "cannot create user cause payload not meet data type specification",
    ),
    "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
        "cannot create user cause username length limit reached",
    ),
    "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
        "cannot create user cause username contain restricted characters",
    ),
}

module.exports = DomainErrorTranslator
