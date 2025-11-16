export const passwordMachine = {
    start: "q0",
    accept: "qA",
    error: "qE",
    transitions: {
        "q0": { a:["q1","R"], A:["q1","R"], d:["q1","R"] },
        "q1": { a:["q2","R"], A:["q2","R"], d:["q2","R"] },
        "q2": { a:["q3","R"], A:["q3","R"], d:["q3","R"] },
        "q3": { a:["q4","R"], A:["q4","R"], d:["q4","R"] },
        "q4": { a:["q5","R"], A:["q5","R"], d:["q5","R"] },
        "q5": { a:["q6","R"], A:["q6","R"], d:["q6","R"] },
        "q6": { a:["q7","R"], A:["q7","R"], d:["q7","R"] },
        "q7": { a:["q8","R"], A:["q8","R"], d:["q8","R"] },

        "q8": { a:["q8","R"], A:["q8","R"], d:["q8","R"], B:["qA","S"] }
    }
};
