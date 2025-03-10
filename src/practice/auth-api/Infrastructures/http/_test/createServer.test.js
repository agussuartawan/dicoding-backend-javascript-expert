const pool = require("../../database/postgres/pool")
const UsersTableTestHelper = require("../../../../../../tests/UsersTableTestHelper")
const container = require("../../container")
const createServer = require("../createServer")

describe("HTTP Server", () => {
    afterAll(async () => {
        await pool.end()
    })

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable()
    })

    describe("when POST /users", () => {
        it("should response 201 and persisted user", async () => {
            const requestPayload = {
                username: "username",
                password: "password",
                fullname: "Full Name",
            }
            const server = await createServer(container)

            const response = await server.inject({
                method: "POST",
                url: "/users",
                payload: requestPayload,
            })

            const responseJSON = await JSON.parse(response.payload)
            expect(response.statusCode).toEqual(201)
            expect(responseJSON.status).toEqual("success")
            expect(responseJSON.data.addedUser).toBeDefined()
        })

        it("should response 400 when request payload not contain needed property", async () => {
            const requestPayload = {
                password: "password",
                fullname: "Full Name",
            }
            const server = await createServer(container)

            const response = await server.inject({
                method: "POST",
                url: "/users",
                payload: requestPayload,
            })

            const responseJSON = await JSON.parse(response.payload)
            expect(response.statusCode).toEqual(400)
            expect(responseJSON.status).toEqual("fail")
            expect(responseJSON.message).toEqual(
                "cannot create user cause needed property not included",
            )
        })

        it("should response 400 when request payload not meet data type specification", async () => {
            const requestPayload = {
                username: true,
                password: 123456,
                fullname: ["Full Name"],
            }
            const server = await createServer(container)

            const response = await server.inject({
                method: "POST",
                url: "/users",
                payload: requestPayload,
            })

            const responseJSON = await JSON.parse(response.payload)
            expect(response.statusCode).toEqual(400)
            expect(responseJSON.status).toEqual("fail")
            expect(responseJSON.message).toEqual(
                "cannot create user cause payload not meet data type specification",
            )
        })

        it("should response 400 when username more than 50 characters", async () => {
            const requestPayload = {
                username:
                    "akshdkajhsdkauyjabsdbamnsdbnakshdgai7y398ajkldkjaldkjaldkjaldjaldkjalksjakljskajsljalsjlajdljalkdaj",
                password: "password",
                fullname: "Full Name",
            }
            const server = await createServer(container)

            const response = await server.inject({
                method: "POST",
                url: "/users",
                payload: requestPayload,
            })

            const responseJSON = await JSON.parse(response.payload)
            expect(response.statusCode).toEqual(400)
            expect(responseJSON.status).toEqual("fail")
            expect(responseJSON.message).toEqual(
                "cannot create user cause username length limit reached",
            )
        })

        it("should response 400 when username contain restricted characters", async () => {
            const requestPayload = {
                username: "user name",
                password: "password",
                fullname: "Full Name",
            }

            const server = await createServer(container)

            const response = await server.inject({
                method: "POST",
                url: "/users",
                payload: requestPayload,
            })

            const responseJSON = await JSON.parse(response.payload)
            expect(response.statusCode).toEqual(400)
            expect(responseJSON.status).toEqual("fail")
            expect(responseJSON.message).toEqual(
                "cannot create user cause username contain restricted characters",
            )
        })

        it("should response 400 when username unavailable", async () => {
            await UsersTableTestHelper.addUser({ username: "username" })
            const payload = {
                username: "username",
                password: "password",
                fullname: "Full Name",
            }
            const server = await createServer(container)

            const response = await server.inject({
                method: "POST",
                url: "/users",
                payload: payload,
            })

            const responseJSON = await JSON.parse(response.payload)
            expect(response.statusCode).toEqual(400)
            expect(responseJSON.status).toEqual("fail")
            expect(responseJSON.message).toEqual(
                "cannot create user cause username unavailable",
            )
        })
    })
})
