//invocar a io, este enciende la conexion para que el cliente
//pueda emitir y recibir eventos
const server = io();

//se quiere que el cliente emita un msg con el keyword:
//"hello:petter", para que el servidor pueda reconocer al evento
//? emit es el encargado de poder enviar eventos
server.emit("hello:petter", "spiderman no way home");

//? on => encargado de recibir eventos
server.on("bye:petter", (message) => {
    console.log(message);
});


//capturar los textos de los inputs del html
//captura el formaulario que tiene la clase form-comment
const form = document.querySelector(".form-comment");

//? Cuando detectectes el evento submit de este form haz lo siguiente
form.addEventListener("submit", function (e) {
    //? Evitar que recargue la pagina
    e.preventDefault();

    const comment = e.target[1].value;
    const author = e.target[0].value;
    const body = { comment, author };

    //* Envia el evento al servidor para que este guarde mensaje
    server.emit("new:comment", body);

    //array de comentarios
    let comments_array = [];

    //*se espera una respuesta
    server.on("save:comment", (message) => {
        console.log(message);
        comments_array.push(message);
	
        async function getComments() {
            let url = "http://localhost:8090/api/v1/comments";

            try {
                let res = await fetch(url);
                return await res.json();

            } catch (error) {
                console.log(error);
            }
        }

        async function renderComments() {
            let comments = await getComments();

            document.getElementById("box").innerHTML = "";

            Object.values(comments).forEach(c => {
				
                for (let i of Object.keys(c)) {

                    console.log(c[i].comment);

                    let tr = document.createElement("tr");

                    let td = document.createElement("td"); 
                    td.innerHTML = `(${c[i].id})`;

                    let td2 = document.createElement("td"); 
                    td2.innerHTML = `<strong>${c[i].comment}</strong>`;

                    let td3 = document.createElement("td"); 
                    td3.innerHTML = `<i>-${c[i].author}</i>`;

                    tr.appendChild(td); 
                    tr.appendChild(td2); 
                    tr.appendChild(td3); 
                    document.getElementById("box").appendChild(tr);
                }
            });


        }

        renderComments();

    });

    e.target[0].value = "";
    e.target[1].value = "";

});