export const shiftMachine = {
    start: "q0",
    accept: "qA",
    error: "qE",

    transitions: {

        // q0: estamos en la segunda B
        "q0": {
            "B": ["q1", "R"],      // saltar la segunda B
            "0": ["q2", "S"], "1": ["q2", "S"], "2": ["q2", "S"], "3": ["q2", "S"],
            "4": ["q2", "S"], "5": ["q2", "S"], "6": ["q2", "S"], "7": ["q2", "S"],
            "8": ["q2", "S"], "9": ["q2", "S"]
        },

        // q1: leer dígitos normalmente
        "q1": {
            "0": ["q2", "S"], "1": ["q2", "S"], "2": ["q2", "S"], "3": ["q2", "S"],
            "4": ["q2", "S"], "5": ["q2", "S"], "6": ["q2", "S"], "7": ["q2", "S"],
            "8": ["q2", "S"], "9": ["q2", "S"],

            "B": ["qA", "S"]      // si ya no hay dígitos → aceptar
        },

        // q2: borrar el dígito (poner B) y avanzar
        "q2": {
            "0": ["q3", "R"], "1": ["q3", "R"], "2": ["q3", "R"], "3": ["q3", "R"],
            "4": ["q3", "R"], "5": ["q3", "R"], "6": ["q3", "R"], "7": ["q3", "R"],
            "8": ["q3", "R"], "9": ["q3", "R"],

            // si ya hay una B ahí, igual avanzar
            "B": ["q3", "R"]
        },

        // q3: escribir el dígito desplazado y volver a q1
        "q3": {
            "B": ["q1", "R"]
        }
    }
};
