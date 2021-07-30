import {objQuestions} from './preguntas.js'

// Variables
const formulario = document.querySelector('#formulario');
const preguntasContenedor = document.querySelectorAll('.contenedor-preguntas');
const divMain = document.querySelector('.main');

const slider = document.querySelector('#slider');
                
const btnEnviar = document.querySelector('#btn-enviar');
const spinner = document.querySelector('.sk-circle');
let movimiento = 0;

// Arrays

let usuarioRespuestas = [];

//  Objetos
let myQuestions;

// Eventos      
window.addEventListener('DOMContentLoaded', () => {

    newGame();

    formulario.addEventListener('click', e => {        
        if(e.target.classList.contains('btn-siguiente')){
            moverPregunta(-100);
        }else if(e.target.classList.contains('btn-anterior')){
            moverPregunta(100);
        }        
    });

    formulario.addEventListener('submit', tomarRespuestas);

});

function newGame(){                

    // limpiarHTML();

    // slider.classList.add('hidden');
    // spinner.classList.remove('hidden');

    let arrayAleatorio = [];
    
    for( let x = 0 ; x < 5 ; ){
    
        let numeroAleatorio = parseInt((Math.random() * objQuestions.length));        
        arrayAleatorio.includes(numeroAleatorio) ? '' : (arrayAleatorio.push(numeroAleatorio) , x++); 
    
    }
    
    // Tomamos las Preguntas de Nuestro Objeto 
    myQuestions = arrayAleatorio.map( (elemento) => {
    
        return objQuestions[elemento];    
    
    });
    
    myQuestions.forEach( (elemento, index)=>{        

        const { pregunta, respuestas } = elemento;         
    
        preguntasContenedor[index].insertAdjacentHTML('afterbegin', 
        `        
            <div class="pregunta">
                
                <h4>${pregunta}</h4>

                <div class="lista-opciones">

                    <label class="opciones-respuesta">
                        ${respuestas.a}<br>
                        <input type="radio" name="respuestas${(index + 1)}" class="respuesta-input" value="${respuestas.a}">                     
                    </label>
                    
                    <label class="opciones-respuesta">
                        ${respuestas.b} <br>
                        <input type="radio" name="respuestas${(index + 1)}" class="respuesta-input" value="${respuestas.b}">
                    </label>

                    <label class="opciones-respuesta">
                        ${respuestas.c} <br>
                        <input type="radio" name="respuestas${(index + 1)}" class="respuesta-input" value="${respuestas.c}">
                    </label>

                </div>

            </div>                                    
        `

        );

    });

    console.log(myQuestions);          

}

// Mover Preguntas
function moverPregunta(valor){            
    
    formulario.style.left = (movimiento + valor) + "%";
    movimiento = parseInt(formulario.style.left);
    
}

// Tomar Respuestas
function tomarRespuestas(e){

    e.preventDefault();  
    
    slider.remove();
    spinner.classList.remove('hidden');

    // Seleccionamos los Inputs
    const totalRespuestas = Array.from(formulario.querySelectorAll('.respuesta-input:checked'));    

    const respuestasSeleccionadas = totalRespuestas.map( elemento => elemento.value);                
    // Guardamos los Valores en el Objeto
    console.log(respuestasSeleccionadas);
    respuestasSeleccionadas.forEach( (elemento, index) => {
        usuarioRespuestas.push({respuesta: elemento});
    });
    
    comprobarRespuestas(usuarioRespuestas);
    
}

function comprobarRespuestas(usuarioRespuestas){

    let correcto = 0;
    let estadoPreguntas = [];
    let anuncioTitulo = '';
    let anuncioDescripcion = '';

    console.log(usuarioRespuestas);

    usuarioRespuestas.forEach( (elemento, index) => {
        if(usuarioRespuestas[index].respuesta === myQuestions[index].respuestaC){
            correcto++;
            estadoPreguntas.push(`<box-icon name='check-circle' type='solid' color='#05e218' ></box-icon>`)
            
        }else{
            estadoPreguntas.push(`<box-icon name='x-circle' type='solid' color='#d42600' ></box-icon>`)
        }

         
    });

    if(correcto === estadoPreguntas){

        anuncioTitulo = 'ENHORABUENA';
        anuncioDescripcion = 'Enhorabuena tuviste un resultado EXCELENTE';

    }else if(correcto > [ parseInt([estadoPreguntas.length]) / 2]){

        anuncioTitulo = 'Felicidades';
        anuncioDescripcion = 'Felicidades pasaste la prueba';

    }else if(correcto < [ parseInt([estadoPreguntas.length]) / 2]){

        anuncioTitulo = 'Intentalo de Nuevo';
        anuncioDescripcion = 'No pasaste la prueba intentalo de nuevo';
    }
    
    console.log(correcto);                
    console.log(estadoPreguntas);                
    setTimeout(() => {
        
        mostrarResultados(anuncioTitulo, anuncioDescripcion, estadoPreguntas, correcto);               
        
    }, 2000);

}

function mostrarResultados(anuncioTitulo, anuncioDescripcion, estadoPreguntas, correcto){

    spinner.remove();
    
    const divResultado = document.createElement('div');    

    divResultado.insertAdjacentHTML('afterbegin', 
    
        `            
        <div id="resultado-test">
        
            <h2>${anuncioTitulo}</h2>
            <p>${anuncioDescripcion}</p>
    
            <ul id="lista-registro">
    
                <li class="registro-test">
                    <span>Pregunta 1</span>
                    <span>${estadoPreguntas[0]}</span>
                </li>
        
                <li class="registro-test">
                    <span>Pregunta 2</span>
                    <span>${estadoPreguntas[1]}</span>
                </li>
        
                <li class="registro-test">
                    <span>Pregunta 3</span>
                    <span>${estadoPreguntas[2]}</span>
                </li>

                <li class="registro-test">
                    <span>Pregunta 4</span>
                    <span>${estadoPreguntas[3]}</span>
                </li>
                <li class="registro-test">
                    <span>Pregunta 5</span>
                    <span>${estadoPreguntas[4]}</span>
                </li>

                <li class="registro-test">
                    <span>Total</span>
                    <span> ${correcto}/${estadoPreguntas.length}</span>
                </li>
    
            </ul>
    
        </div>

        `
    );
    
    divMain.appendChild(divResultado);

    console.log('Resultados');

}
