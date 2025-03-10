const RegisterUser = require("../RegisterUser")

describe("RegisterUser", () => {
    it("should throw error when payload didn't contains needed property", () => {
        // arrange
        const payload = {
            username: "John",
            password: "123456",
        }

        // action and assert
        expect(() => new RegisterUser(payload)).toThrow(
            "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY",
        )
    })

    it("should throw error when payload didn't meet data type specification", () => {
        const payload = {
            username: 123,
            password: true,
            fullname: "John",
        }

        expect(() => new RegisterUser(payload)).toThrow(
            "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION",
        )
    })

    it("should throw error when username contain more than 50 character", () => {
        const payload = {
            username:
                "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
            password: "123456",
            fullname: "John",
        }

        expect(() => new RegisterUser(payload)).toThrow(
            "REGISTER_USER.USERNAME_LIMIT_CHAR",
        )
    })

    it("should throw error when username contain restricted character", () => {
        const payload = {
            username: "John doe",
            password: "123456",
            fullname: "John",
        }

        expect(() => new RegisterUser(payload)).toThrow(
            "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER",
        )
    })

    it("should create RegisterUser object correctly", () => {
        // arrange
        const payload = {
            username: "john",
            password: "123456",
            fullname: "John",
        }

        // action
        const { username, password, fullname } = new RegisterUser(payload)

        // assert
        expect(username).toEqual(payload.username)
        expect(password).toEqual(payload.password)
        expect(fullname).toEqual(payload.fullname)
    })
})
