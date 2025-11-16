export const inventarioMachine = {
    start: "q0",
    accept: "qA",
    error: "qE",
    transitions: {
        "q0": { I:["q1","R"] },
        "q1": { N:["q2","R"] },
        "q2": { V:["q3","R"] },
        "q3": { "-":["q4","R"] },

        "q4": { d:["q5","R"] },
        "q5": { d:["q5","R"], B:["qA","S"] }
    }
};
