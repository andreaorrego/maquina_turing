import { pinMachine } from "./machines/pin.js";
import { passwordMachine } from "./machines/password.js";
import { userMachine } from "./machines/user.js";
import { inventarioMachine } from "./machines/inventario.js";

const machines = {
    pin: pinMachine,
    password: passwordMachine,
    user: userMachine,
    inventario: inventarioMachine
};

let tape = [];
let head = 0;
let state = "";
let activeMachine = null;


// Cargar cinta y máquina
document.getElementById("loadBtn").onclick = () => {

    const input = document.getElementById("inputString").value.trim();
    const mode = document.getElementById("regexSelect").value;

    activeMachine = machines[mode];

    tape = input.split("");
    tape.push("B");

    head = 0;
    state = activeMachine.start;

    updateUI("Cargado. Listo para ejecutar.");
};



// Paso a paso
document.getElementById("stepBtn").onclick = () => {

    if (!activeMachine) return;

    const symbol = tape[head] || "B";
    const rules = activeMachine.transitions[state];

    if (!rules || !rules[symbol]) {
        state = activeMachine.error;
        updateUI("Rechazado");
        return;
    }

    const [nextState, move] = rules[symbol];

    state = nextState;
    if (move === "R") head++;

    if (state === activeMachine.accept) {
        updateUI("Aceptado");
        return;
    }

    updateUI("Ejecutando…");
};


// Ejecutar hasta terminar
document.getElementById("runBtn").onclick = () => {
    let steps = 0;

    while (state !== activeMachine.accept && state !== activeMachine.error && steps < 200) {
        document.getElementById("stepBtn").onclick();
        steps++;
    }
};


// Reiniciar
document.getElementById("resetBtn").onclick = () => {
    tape = [];
    head = 0;
    state = "";
    activeMachine = null;
    updateUI("Reiniciado");
};


// Actualizar interfaz
function updateUI(msg) {
    document.getElementById("tape").innerText = tape.join(" ");
    document.getElementById("state").innerText = state;
    document.getElementById("result").innerText = msg;

    if (state === "qA") document.getElementById("result").className = "accept";
    else if (state === "qE") document.getElementById("result").className = "reject";
    else document.getElementById("result").className = "";
}

