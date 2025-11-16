import { pinMachine } from "./machines/pin.js";
import { passwordMachine } from "./machines/password.js";
import { userMachine } from "./machines/user.js";
import { inventarioMachine } from "./machines/inventario.js";
import { shiftMachine } from "./machines/shift.js";

export function updateStateBox({ step, state, head, symbol, pinLength }) {
    document.getElementById("stateText").innerHTML = `
        <b>Paso:</b> ${step}<br>
        <b>Estado:</b> ${state}<br>
        <b>Head:</b> ${head}<br>
        <b>Lee:</b> ${symbol}<br>
        <b>Dígitos leídos:</b> ${pinLength}
    `;
}

const machines = {
    pin: pinMachine,
    password: passwordMachine,
    user: userMachine,
    inventario: inventarioMachine,
    shift: shiftMachine 
};

let tape = [];
let head = 2;
let state = "";
let activeMachine = null;

let step = 0;        // 🟦 contador de pasos
let pinLength = 0;   // 🟦 contador de dígitos leídos

document.getElementById("loadBtn").onclick = () => {

    const input = document.getElementById("inputString").value.trim();
    const mode = document.getElementById("regexSelect").value;

    activeMachine = machines[mode];

    tape = ["B", "B", ...input.split(""), "B", "B"]; 
    head = 1; 
    state = activeMachine.start;

    // Reiniciar contadores
    step = 0;
    pinLength = 0;

    updateUI("Cargado correctamente");
};

document.getElementById("stepBtn").onclick = () => {

    if (!activeMachine) return;

    let symbol = tape[head] || "B";
    let rules = activeMachine.transitions[state];

    // 🟦 Si lee un dígito, incrementar contador
    if (!isNaN(symbol)) pinLength++;

    // 🟦 ACTUALIZAR PANEL DE ESTADO AQUÍ
    updateStateBox({
        step,
        state,
        head,
        symbol,
        pinLength
    });

    step++; // aumentar contador

    if (!rules || !rules[symbol]) {
        updateUI("Sin transición…");
        return;
    }

    const [nextState, move] = rules[symbol];

    if (nextState === activeMachine.accept) {
        tape.push("B");
    }

    state = nextState;

    if (move === "R") head++;

    updateUI(state === activeMachine.accept ? "Aceptado" : "Ejecutando…");
};

// Reiniciar
document.getElementById("resetBtn").onclick = () => {
    tape = [];
    head = 0;
    state = "";
    activeMachine = null;

    step = 0;
    pinLength = 0;

    updateUI("Reiniciado");
};

function renderTape() {
    const tapeDiv = document.getElementById("tape");
    tapeDiv.innerHTML = "";

    // Tamaño fijo de ventana visible
    const WINDOW = 21;

    // Centrar la ventana alrededor del head
    const half = Math.floor(WINDOW / 2);

    const start = head - half;
    const end = head + half;

    for (let i = start; i <= end; i++) {
        const cell = document.createElement("div");
        cell.className = "tape-cell";

        let symbol = tape[i] ?? "B";
        cell.textContent = symbol;

        // El head SIEMPRE en la celda central
        if (i === head) {
            cell.style.background = "#a7c7ff";
            cell.style.border = "3px solid #0057ff";
        }

        tapeDiv.appendChild(cell);
    }
}

function updateUI(msg) {
    renderTape();   // ⬅️ ahora la cinta se mueve

    document.getElementById("state").innerText = state;
    document.getElementById("result").innerText = msg;

    if (state === "qA") document.getElementById("result").className = "accept";
    else if (state === "qE") document.getElementById("result").className = "reject";
    else document.getElementById("result").className = "";
}

