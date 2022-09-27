let datos = [];

//declarar un objecte amb els seus atributs
let tuPartida = {
    num_respuesta: 0,
    v_respuestas: []
};

function renderEstado() {
    const MAX_PREGUNTAS = document.getElementById("preguntes").value;
    htmlStr = `Numero de respuestas ${tuPartida.num_respuesta} <br><ul>`;
    for (let i = 0; i < tuPartida.v_respuestas.length; i++){
        if (tuPartida.v_respuestas[i] != undefined) {
            htmlStr += `<li> ${datos[i].question} --> ${datos[i].answers[tuPartida.v_respuestas[i]]}`;
        }
    }
    htmlStr += "</ul>";
    if (tuPartida.num_respuesta == MAX_PREGUNTAS) {
        htmlStr += `<button class="btn btn-lg btn-danger" onclick="enviarResultados()">ENVIAR RESULTADOS</button>`;
    }
    document.getElementById("tableroPreguntasSeleccionadas").innerHTML = htmlStr;
}

function cambiarUsuario(){
    localStorage.removeItem("usuario","");
    document.getElementById("benvinguda").style.display = "none";
    document.getElementById("usuario").style.display = "block";
    document.getElementById("cambiarUsuario").style.display = "none";
}

function enviarResultados(){
    //build formData object
    let formData = new FormData();
    formData.append('dades', JSON.stringify(tuPartida));
  
    fetch("http://localhost/QuizV2/API/finalitza.php",{
        body:formData,
        method:"post"
    })
    .then((reponse) => reponse.json())
    .then((data) =>{
        console.log(data)
        imprimirResultados(data);
    } );
}

function imprimirResultados(datos){
    document.getElementById("enviarResultados").innerHTML = "Resultats són: <br>";
    document.getElementById("enviarResultados").innerHTML += "Total Preguntes:"+datos.totalR+"<br>";
    document.getElementById("enviarResultados").innerHTML += "Preguntes correctes: "+datos.correctes+"<br>";
}


function responder(pregunta, respuesta) {
    console.log(`Has respondido a la pregunta ${pregunta} con ${respuesta}`);
    console.log(`Has respondido a la pregunta ${datos[pregunta].question} con ${datos[pregunta].answers[respuesta]}`);
    if (tuPartida.v_respuestas[pregunta] == undefined) {
        tuPartida.num_respuesta++;
    }
    tuPartida.v_respuestas[pregunta] = respuesta;
    renderEstado();
}

let htmlStr = `<h1>JUEGO DE PREGUNTAS</h1>`;

function renderPreguntas(numP){
    for (let i = 0; i < numP; i++) {
        htmlStr += `<h2>${datos[i].question}</h2>`;

        for (let j = 0; j < 4; j++) {
            //btn btn-primary btn-sm --> small buttons of a bootstrap
            htmlStr += `<button class="btn btn-primary btn-sm" onclick="responder(${i},${j})" value="${j}">
                    ${datos[i].answers[j]}</button>&nbsp;&nbsp;`;
        }
    }
    document.getElementById("listadoPreguntas").innerHTML = htmlStr;
}

function jugar(){
    //aquesta funcio haura de resetejar les preguntes quan torni a clicar
    //crear una data del username que li poso al input text i guardo a LOCAL STORAGE
    if(localStorage.getItem("usuario") == "" || localStorage.getItem("usuario") == null){
        localStorage.setItem("usuario", document.getElementById("usuario").value);
    }
    
    //passar com a parametre num de preguntes 
    let n_preguntas  = parseInt(document.getElementById("preguntes").value);
    //console.log(n_preguntas);

    fetch("http://localhost/QuizV2/API/getPreguntes.php?n=" + n_preguntas)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data)
            datos = data;
            renderPreguntas(n_preguntas);
        });
    
    let usuario = localStorage.getItem("usuario", document.getElementById("usuario").value);

    if(usuario != null && usuario != ""){
        document.getElementById("benvinguda").innerHTML = "Benvenid@ "+ usuario;
        document.getElementById("usuario").style.display = "none";
        document.getElementById("cambiarUsuario").style.display = `<button onclick = cambiarUsuario()>Cambiar usuario</button>`;
    }
}
