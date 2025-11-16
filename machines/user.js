export const userMachine = {
    start: "q0",
    accept: "qA",
    error: "qE",
    transitions: {

        "q0": { a:["q1","R"], g:["q5","R"], u:["q9","R"] },
        "q1": { d:["q2","R"] },
        "q2": { m:["q3","R"] },
        "q3": { i:["q4","R"] },
        "q4": { n:["qA","S"] },

        "q5": { u:["q6","R"] },
        "q6": { e:["q7","R"] },
        "q7": { s:["q8","R"] },
        "q8": { t:["qA","S"] },

        "q9": { s:["q10","R"] },
        "q10": { e:["q11","R"] },
        "q11": { r:["qA","S"] }
    }
};
