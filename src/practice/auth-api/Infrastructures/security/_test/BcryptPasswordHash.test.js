const bcrypt = require("bcrypt")
const BcryptPasswordHash = require("../BcryptPasswordHash")

describe("BcryptPasswordHash", () => {
    describe("hash function", () => {
        it("should hash password correctly", async () => {
            const spyHash = jest.spyOn(bcrypt, "hash")
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt)

            const hashedPassword =
                await bcryptPasswordHash.hash("plain_password")

            expect(typeof hashedPassword).toEqual("string")
            expect(hashedPassword).not.toEqual("plain_password")
            expect(spyHash).toBeCalledWith("plain_password", 10)
        })
    })
})
