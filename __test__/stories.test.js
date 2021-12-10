import request from "supertest";
import { app } from "../api/app";
import { base_url } from "../config/config";

//token
const bearer =
	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcGl0b0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InBlcGl0bzEyMzQ1NiIsImlhdCI6MTYzMDU5NTkxNH0.O9Xz7lgpXHmCf2VP0H3v0WonpdABmdxvEJm2q8hixtQ";

describe("Lista de stories", () => {
    test("GET", async () => {
        const result = await request(app)
            .get(`${base_url}/story/stories`)
            .set("Authorization", bearer); //establece los headers (auth)

        expect(result.status).toBe(200); //resultado esperado HTTP 200 (ok)
        expect(result.ok).toBe(true);
    });
});

describe("Mostrar story por ID", () => {
    test("GET", async () => {
        const result = await request(app)
            .get(`${base_url}/story/story/asdfdg`)
            .set("Authorization", bearer);

        expect(result.status).toBe(200);
        expect(result.ok).toBe(true);
    });
});

describe("Crear story", () => {
    test("POST", async () => {
        //datos a insertar
        const body = {
            title: "Test",
            content: "lorem impsum dolor",
            user_id: "123456"
        };

        const result = await request(app)
            .post(`${base_url}/story/create`)
            .send(body)
            .set("Authorization", bearer);

        expect(result.status).toBe(201); //resultado esperado HTTP 201 (created)
        expect(result.ok).toBe(true);
    });
});

describe("Actualizar story por ID", () => {
    test("PUT", async () => {
        const body = {
            content: "Hola JS!",
        };

        const result = await request(app)
            .put(`${base_url}/story/update/asdfdg`)
            .send(body)
            .set("Authorization", bearer);

        expect(result.status).toBe(200);
        expect(result.ok).toBe(true);
    });
});

describe("Eliminar story por ID", () => {
    test("DELETE", async () => {
        const result = await request(app)
            .del(`${base_url}/story/destroy/asdfdg`)
            .set("Authorization", bearer);

        expect(result.status).toBe(200);
        expect(result.ok).toBe(true);
    });
});