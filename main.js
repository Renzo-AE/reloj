// VARIABLE QUE IDENTIFICA SI ESTA EN CRONOMETRO O TEMPORIZADOR
// si esta en false significa que esta en  temporizador
// si esta en true significa que esta en cronometro
let estado = false

// Hacemos que el boton reiniciar tiempo que es para el cronometro este con 
// un display none al principio
const btnReiniciar = document.querySelector(".reiniciar")
btnReiniciar.style.display = "none"

// DEFINIMOS VARIABLES
//  
// vemos que hours, minuts, seconds y miliseconds tienen un array de dos valores
// - el primer valor de cada array pertenecen a la opción del temporizador
// - el segundo valor de cada array pertenecen a la opción del cronometro
let hours = [0, 0]
let minuts = [0, 0]
let seconds = [0, 0]
let miliseconds = [0, 0]
let tiempoEstado = false
let tiempo

// DECLARAMOS FUNCIONES
//
// funcion que pintara las horas, minutos y secgundos
const pintarNumbers = (option) => {
    if (!option) {
        document.querySelector('.hours').innerText = hours[0].toString().padStart(2, '0')
        document.querySelector('.minutes').innerText = minuts[0].toString().padStart(2, '0')
        document.querySelector('.seconds').innerText = seconds[0].toString().padStart(2, '0')
    } else {
        document.querySelector('.hours').innerText = hours[1].toString().padStart(2, '0')
        document.querySelector('.minutes').innerText = minuts[1].toString().padStart(2, '0')
        document.querySelector('.seconds').innerText = seconds[1].toString().padStart(2, '0')
        document.querySelector('.miliseconds').innerText = miliseconds[1].toString().padStart(2, '0')
    }
}
// funcion que se ejecutara para el temporizador
function temporizador() {
    if (hours[0] == 0 && minuts[0] == 0 && seconds[0] == 0 && miliseconds[0] <= 1 || !tiempoEstado) {
        clearInterval(tiempo)
        btnIniciar.textContent = 'Iniciar'
        if (!estado) {
            document.querySelectorAll('.topDown').forEach((btn) => btn.classList.remove('desactivar'))
        }
    }
    else {
        if (miliseconds[0] == 0) miliseconds[0] = 99
        else miliseconds[0]--

        if (seconds[0] == 0 && miliseconds[0] == 99) seconds[0] = 59
        else if (miliseconds[0] == 99) seconds[0]--

        if (minuts[0] == 0 && seconds[0] == 59 && miliseconds[0] == 99) minuts[0] = 59
        else if (seconds[0] == 59 && miliseconds[0] == 99) minuts[0]--

        if (minuts[0] == 59 && seconds[0] == 59 && miliseconds[0] == 99) hours[0]--

        pintarNumbers(estado)
    }
}
// funcion que se ejecutara para el cronometro
function cronometro() {
    if (!tiempoEstado) {
        clearInterval(tiempo)
        btnIniciar.textContent = 'Iniciar'
    }
    else {
        if (miliseconds[1] == 99) miliseconds[1] = 0
        else miliseconds[1]++

        if (seconds[1] == 59 && miliseconds[1] == 0) seconds[1] = 0
        else if (miliseconds[1] == 0) seconds[1]++

        if (minuts[1] == 59 && seconds[1] == 0 && miliseconds[1] == 0) minuts[1] = 0
        else if (seconds[1] == 0 && miliseconds[1] == 0) minuts[1]++

        if (minuts[1] == 0 && seconds[1] == 0 && miliseconds[1] == 0) hours[1]++

        pintarNumbers(estado)
    }
}

// Hace que cuando selecciones la opción temporizador o cronometro 
// se pinte de un color para identificar en donde estamos
// y tambien actualize la variable 'estado'
const btnOption = document.querySelector('.nav')
btnOption.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn1')) {
        document.querySelector('.btn1').classList.add('cambio')
        document.querySelector('.btn2').classList.remove('cambio')

        btnReiniciar.style.display = "none"

        estado = false
        tiempoEstado = false
        document.querySelectorAll('.topDown').forEach((btn) => btn.classList.remove('desactivar'))
        document.querySelectorAll('#extra').forEach((btn) => btn.classList.add('extra'))
        pintarNumbers(estado)
    }

    if (event.target.classList.contains('btn2')) {
        document.querySelector('.btn1').classList.remove('cambio')
        document.querySelector('.btn2').classList.add('cambio')
        btnReiniciar.style.display = "block"


        estado = true
        tiempoEstado = false
        document.querySelectorAll('.topDown').forEach((btn) => btn.classList.add('desactivar'))
        document.querySelectorAll('#extra').forEach((btn) => btn.classList.remove('extra'))
        pintarNumbers(estado)
    }
})

// Programamos los botones del Temporizador para seleccione el tiempo que quiera la persona
const holas = document.querySelector('.main__numeros')
holas.addEventListener('click', (event) => {
    const btn = event.target

    if (btn.classList.contains('topDown')) {
        if (btn.classList.contains('upHours')) hours[0]++
        if (btn.classList.contains('downHours')) if (hours[0] > 0) hours[0]--
        if (btn.classList.contains('upMinuts')) {
            if (minuts[0] > 58) minuts[0] = 0
            else minuts[0]++
        }
        if (btn.classList.contains('downMinuts')) {
            if (minuts[0] < 1) minuts[0] = 59
            else minuts[0]--
        }
        if (btn.classList.contains('upSeconds')) {
            if (seconds[0] > 58) seconds[0] = 0
            else seconds[0]++
        }
        if (btn.classList.contains('downSeconds')) {
            if (seconds[0] < 1) seconds[0] = 59
            else seconds[0]--
        }

        pintarNumbers(estado)
    }
})


// Programamos el boton iniciar
const btnIniciar = document.querySelector('.start')
btnIniciar.addEventListener('click', () => {

    if (btnIniciar.textContent.toLocaleLowerCase() == 'iniciar') {
        tiempoEstado = true
        if (!estado) {
            tiempo = setInterval(temporizador, 10)
            document.querySelectorAll('.topDown').forEach((btn) => btn.classList.add('desactivar'))
        } else {
            tiempo = setInterval(cronometro, 10)
        }
        btnIniciar.textContent = 'Parar'
        btnReiniciar.style.display = "none"
    } else {
        if (estado) btnReiniciar.style.display = "block"

        if (!estado) document.querySelectorAll('.topDown').forEach((btn) => btn.classList.remove('desactivar'))

        tiempoEstado = false
        btnIniciar.textContent = 'Iniciar'
        console.log(tiempoEstado)
    }
})

// Programamos el boton reiniciar del cronometro
btnReiniciar.addEventListener('click', () => {
    hours[1] = 0
    minuts[1] = 0
    seconds[1] = 0
    miliseconds[1] = 0
    pintarNumbers(estado)
})