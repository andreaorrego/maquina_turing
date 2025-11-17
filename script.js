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
let head = 0;
let state = "";
let activeMachine = null;
let step = 0;
let pinLength = 0;
const BLANK = "_"; 

document.getElementById("loadBtn").onclick = () => {
    const input = document.getElementById("inputString").value.trim();
    const mode = document.getElementById("regexSelect").value;

    activeMachine = machines[mode];
    const padding = 3;
    tape = [...Array(padding).fill(BLANK), ...input.split(""), ...Array(padding).fill(BLANK)];
    head = padding;
    state = activeMachine.start;
    step = 0;
    pinLength = 0;

    updateUI("Cargado correctamente");
};

document.getElementById("stepBtn").onclick = () => {
    if (!activeMachine) return;
    if (state === activeMachine.accept || state === activeMachine.reject) return;

    let symbol = tape[head] ?? BLANK;
    let isLetterOrDigit = false;

    if (activeMachine === pinMachine || activeMachine === passwordMachine || activeMachine === inventarioMachine) {
        if (/[0-9]/.test(symbol)) {
            symbol = "d";
            isLetterOrDigit = true;
        } else if (/[a-zA-Z]/.test(symbol) && activeMachine !== inventarioMachine) {
            symbol = "l"; 
            isLetterOrDigit = true;
        }
    }

    if (isLetterOrDigit) pinLength++;

    updateStateBox({ step, state, head, symbol, pinLength });
    step++;

    const rules = activeMachine.transitions[state];
    if (!rules || !rules[symbol]) {
        state = activeMachine.reject;
        updateUI("Rechazado");
        return;
    }

    const [nextState, move, writeSymbol] = rules[symbol];
    tape[head] = writeSymbol ?? tape[head];
    state = nextState;

    if (move === "R") head++;
    else if (move === "L") head--;

    if (head < 0) { tape.unshift(BLANK); head = 0; }
    else if (head >= tape.length) tape.push(BLANK);

    if (state === activeMachine.accept) updateUI("Aceptado");
    else if (state === activeMachine.reject) updateUI("Rechazado");
    else updateUI("Ejecutando…");
};

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
    const WINDOW = 15;
    const half = Math.floor(WINDOW / 2);
    const start = head - half;
    const end = head + half;

    for (let i = start; i <= end; i++) {
        const cell = document.createElement("div");
        cell.className = "tape-cell";
        cell.textContent = tape[i] ?? BLANK;
        if (i === head) {
            cell.style.background = "#a7c7ff";
            cell.style.border = "3px solid #0057ff";
        }
        tapeDiv.appendChild(cell);
    }
}

function updateUI(msg) {
    renderTape();
    document.getElementById("state").innerText = state;
    document.getElementById("result").innerText = msg;

    if (state === activeMachine.accept) document.getElementById("result").className = "accept";
    else if (state === activeMachine.reject) document.getElementById("result").className = "reject";
    else document.getElementById("result").className = "";
}
