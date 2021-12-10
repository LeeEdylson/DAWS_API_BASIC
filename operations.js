/**
 * La funcion rertorna la suma de 2 numeros
 * @param {number} a 
 * @param {number} b 
 * @returns int
 */
export const sumar = (a, b) => +a + +b;
//el operador + convierte la variable a entero
	
export const restar = (a, b) => +a - +b;

export const multiplicar = (a, b) => +a * +b;

export const dividir = (a, b) => {
    if(isFinite(+a / +b)) {
        return +a / +b;
    }

    return false;
};