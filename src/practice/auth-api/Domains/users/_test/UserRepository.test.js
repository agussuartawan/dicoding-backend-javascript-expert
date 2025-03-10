const UserRepository = require("../UserRepository")

describe("UserRepository", () => {
    it("should throw error when invoke abstract behaviour", async () => {
        const userRepository = new UserRepository()

        await expect(() => userRepository.addUser({})).rejects.toThrow(
            "USER_REPOSITORY.METHOD_NOT_IMPLEMENTED",
        )
        await expect(() =>
            userRepository.verifyAvailableUsername(""),
        ).rejects.toThrow("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    })
})
