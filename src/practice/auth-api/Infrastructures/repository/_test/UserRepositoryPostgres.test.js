const UsersTableTestHelper = require("../../../../../../tests/UsersTableTestHelper")
const InvariantError = require("../../../Commons/exceptions/InvariantError")
const RegisterUser = require("../../../Domains/users/entities/RegisterUser")
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser")
const pool = require("../../database/postgres/pool")
const UserRepositoryPostgres = require("../UserRepositoryPostgres")

describe("UserRepositoryPostgres", () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
    })

    afterAll(async () => {
        await pool.end()
    })

    describe("verifyAvailableUsername function", () => {
        it("should throw InvariantError when username not available", async () => {
            await UsersTableTestHelper.addUser({ username: "username" })
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

            await expect(
                userRepositoryPostgres.verifyAvailableUsername("username"),
            ).rejects.toThrow(InvariantError)
        })

        it("should not throw InvariantError when username available", async () => {
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

            await expect(
                userRepositoryPostgres.verifyAvailableUsername("username"),
            ).resolves.not.toThrow(InvariantError)
        })
    })

    describe("addUser function", () => {
        it("should persist register user", async () => {
            const registerUser = new RegisterUser({
                username: "username",
                password: "password",
                fullname: "Full Name",
            })
            const userRepositoryPostgres = new UserRepositoryPostgres(
                pool,
                () => "123456",
            )

            await userRepositoryPostgres.addUser(registerUser)

            const user = await UsersTableTestHelper.findUsersById("user-123456")
            expect(user).toHaveLength(1)
        })

        it("should return registered user correctly", async () => {
            const registerUser = new RegisterUser({
                username: "username",
                password: "password",
                fullname: "Full Name",
            })
            const fakeIdGenerator = () => "123456"
            const userRepositoryPostgres = new UserRepositoryPostgres(
                pool,
                fakeIdGenerator,
            )

            const registeredUser =
                await userRepositoryPostgres.addUser(registerUser)

            expect(registeredUser).toStrictEqual(
                new RegisteredUser({
                    id: "user-123456",
                    username: "username",
                    fullname: "Full Name",
                }),
            )
        })
    })
})
