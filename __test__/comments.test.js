import request from "supertest";
import { app } from "../api/app";
import { base_url } from "../config/config";

describe("Obtener comentarios", () => {
    test("GET", async () => {
        const result = await request(app)
            .get(`${base_url}/comments`);

        expect(result.status).toBe(200); //HTTP 200 (ok)
        expect(result.ok).toBe(true);
    });
});