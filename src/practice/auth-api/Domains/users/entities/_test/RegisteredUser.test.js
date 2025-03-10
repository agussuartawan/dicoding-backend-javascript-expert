const RegisteredUser = require("../RegisteredUser")

describe("RegisteredUser", () => {
    it("should throw error when payload didn't contain needed property", () => {
        const payload = {
            username: "username",
            fullname: "fullname",
        }

        expect(() => new RegisteredUser(payload)).toThrow(
            "REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY",
        )
    })

    it("should throw error when payload did not meet data type specification", () => {
        const payload = {
            id: true,
            username: 1,
            fullname: "username",
        }

        expect(() => new RegisteredUser(payload)).toThrow(
            "REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION",
        )
    })

    it("should create RegisteredUser object correctly", () => {
        const payload = {
            id: "1",
            username: "username",
            fullname: "fullname",
        }

        const registeredUser = new RegisteredUser(payload)

        expect(registeredUser.id).toEqual(payload.id)
        expect(registeredUser.username).toEqual(payload.username)
        expect(registeredUser.fullname).toEqual(payload.fullname)
    })
})
