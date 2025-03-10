const AuthenticationError = require("../AuthenticationError")

describe("AuthenticationError", () => {
    it("should throw an AuthenticationError correctly", () => {
        const authenticationError = new AuthenticationError("unauthorized")

        expect(authenticationError.name).toEqual("AuthenticationError")
        expect(authenticationError.message).toEqual("unauthorized")
        expect(authenticationError.statusCode).toEqual(401)
    })
})
