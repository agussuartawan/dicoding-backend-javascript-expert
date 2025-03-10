const InvariantError = require("../InvariantError")

describe("InvariantError", () => {
    it("should create an error correctly", () => {
        const invariantError = new InvariantError("an error occurred")

        expect(invariantError.name).toEqual("InvariantError")
        expect(invariantError.statusCode).toEqual(400)
        expect(invariantError.message).toEqual("an error occurred")
    })
})
