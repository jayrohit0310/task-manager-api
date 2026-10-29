
const request = require("supertest");
const app = require("../app");

describe("Task Management API", () => {
    test("Unknown route returns 404", async () => {
        const response = await request(app).get(
            "/route-that-does-not-exist"
        );

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Route Not Found");
    });
});
