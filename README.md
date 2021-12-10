# CONST LET VAR

* CONST -> Es usado para constantes, en JS moderno se recomienda usar const cuando tu variable no cambia, porque const es inmutable. Ademas, const pesa menos que let y var

```
const express = requiere ('express')
```
  
* LET -> Es usado cuando el valor de la variable puede cambiar en el contexto, por ejemplo:

```
let suma = 0;
suma = 6 + 4;
```

* VAR -> Es muy parecido a let, pero ya no se usa, por que var va en un contexto global
  
```
nota: ya no se debe usar var
```

# JWT
nota: el login y el signup no se deben proteger, porque son las encargadas de generar el token

## Headers
La forma en la que se pasan los tokens es por el HEADER. Se usa la palabra reservada:
``
Authorization: Bearer <token>
``

## Estados HTTP
```
200: ok
403: forbidden (falta de permisos) unathorization
500: internal error
404: not found
401: error message
201: created
```