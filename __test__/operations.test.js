import { sumar, restar, multiplicar, dividir, dividir2 } from "../operations";

/**
 * Sintaxis: test("recibe la descripcion de la prueba", "callback")
 */
test("Esta función va a recibir 6+4 y debe ser = 10", () => {
    expect(sumar(6, 4)).toBe(10);
});

test("Esta función va a restar 8-6 y debe ser =2", () => {
    expect(restar(8, 6)).toBe(2);
});

test("Esta función va a multiplicar 6*7 y debe ser =42", () => {
    expect(multiplicar(6, 7)).toBe(42);
});

 
test("Esta función va a dividir 30/6 y debe ser =5", () => {
    expect(dividir(30, 6)).toBe(5);
});

test("Esta función va a dividir 45/0 y debe retornar false", () => {
    expect(dividir(45, 0)).toBe(false); //false, pq no es posible esa division
});

