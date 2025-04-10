const PasswordHash = require("../../Applications/security/PasswordHash")

class BcryptPasswordHash extends PasswordHash {
    constructor(bcrypt, saltRound = 10) {
        super()
        this.bcrypt = bcrypt
        this.saltRound = saltRound
    }

    async hash(password) {
        return this.bcrypt.hash(password, this.saltRound)
    }
}

module.exports = BcryptPasswordHash
