const ClientError = require("../ClientError")

describe("ClientError", () => {
    it("Should throw an error directly when use it", () => {
        expect(() => new ClientError("")).toThrow()
    })
})
