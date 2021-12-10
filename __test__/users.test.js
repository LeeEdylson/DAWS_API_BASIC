import request from "supertest";
import { app } from "../api/app";
import { base_url } from "../config/config";

//el token de jwt
const bearer =
	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcGl0b0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InBlcGl0bzEyMzQ1NiIsImlhdCI6MTYzMDU5NTkxNH0.O9Xz7lgpXHmCf2VP0H3v0WonpdABmdxvEJm2q8hixtQ";

//1er test: listar a los usuarios
describe("Lista de usuarios", () => {
    test("Metodo GET", async () => {
        const result = await request(app)
            .get(`${base_url}/user/users`)
            .set("Authorization", bearer); //para establecer los headers (auth en este caso)

        expect(result.status).toBe(200); //resultado esperado, respuesta HTTP 200 (ok)
        expect(result.ok).toBe(true);
    });
});

//2do test: mostrar a un usuario x ID
describe("Mostrar usuario por ID", () => {
    test("Metodo GET", async () => {
        const result = await request(app)
            .get(`${base_url}/user/show/L3HS`)
            .set("Authorization", bearer); 

        expect(result.status).toBe(200); 
        expect(result.ok).toBe(true);
    });
});

//3er test: actualizar un usuario x ID
describe("Actualizar un usuario por ID", () => {
    test("Metodo PUT", async () => {
        //datos a insertar
        const body = {
            name: "Jamutaq_1",
            last_name: "Ortega_1",
        };

        const result = await request(app)
            .put(`${base_url}/user/update/L3HS`)
            .send(body)
            .set("Authorization", bearer);

        expect(result.status).toBe(200);
        expect(result.ok).toBe(true);
    });
});

//4to test: eliminar un usuario x ID
describe("Eliminar un usuario por ID", () => {
    test("Metodo DELETE", async () => {
        const result = await request(app)
            .del(`${base_url}/user/destroy/L3HS`)
            .set("Authorization", bearer);

        expect(result.status).toBe(200);
        expect(result.ok).toBe(true);
    });
});