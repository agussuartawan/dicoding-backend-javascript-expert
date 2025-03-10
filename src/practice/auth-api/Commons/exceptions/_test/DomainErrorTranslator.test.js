const DomainErrorTranslator = require("../DomainErrorTranslator")
const InvariantError = require("../InvariantError")

describe("DomainErrorTranslator", () => {
    it("should translate error correctly", () => {
        expect(
            DomainErrorTranslator.translate(
                new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY"),
            ),
        ).toStrictEqual(
            new InvariantError(
                "cannot create user cause needed property not included",
            ),
        )

        expect(
            DomainErrorTranslator.translate(
                new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"),
            ),
        ).toStrictEqual(
            new InvariantError(
                "cannot create user cause payload not meet data type specification",
            ),
        )

        expect(
            DomainErrorTranslator.translate(
                new Error("REGISTER_USER.USERNAME_LIMIT_CHAR"),
            ),
        ).toStrictEqual(
            new InvariantError(
                "cannot create user cause username length limit reached",
            ),
        )

        expect(
            DomainErrorTranslator.translate(
                new Error(
                    "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER",
                ),
            ),
        ).toStrictEqual(
            new InvariantError(
                "cannot create user cause username contain restricted characters",
            ),
        )
    })

    it("should return original error when error message is not needed to translate", () => {
        const error = new Error("some_error_message")

        const translatedError = DomainErrorTranslator.translate(error)

        expect(translatedError).toStrictEqual(error)
    })
})
