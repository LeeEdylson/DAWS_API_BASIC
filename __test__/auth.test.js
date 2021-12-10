import request from "supertest";
import { app } from "../api/app";
import { base_url } from "../config/config";

//1er test: hacer el login
describe("User login", () => {
    test("Metodo POST", async () => {
        const body = {
            email: "jortega@gmail.com",
            password: "abc"
        };

        const result = await request(app)
            .post(`${base_url}/auth/login`)
            .send(body);

        expect(result.status).toBe(200); //resultado esperado, respuesta HTTP 200 (ok)
        expect(result.ok).toBe(true);
    });
});

//2do test: crear un usuario
describe("User sign in", () => {
    test("Metodo POST", async () => {
        //datos a insertar
        const body = {
            name: "Jamutaq_TEST",
            last_name: "Ortega_TEST",
            email: "jortega_TEST@gmail.com",
            password: "abc_TEST"
        };

        const result = await request(app)
            .post(`${base_url}/auth/signUp`)
            .send(body);

        expect(result.status).toBe(201); //resultado esperado, respuesta HTTP 201 (created)
        expect(result.ok).toBe(true);
    });
});