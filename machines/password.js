export const passwordMachine = {
    start: "q0",
    accept: "qA",
    reject: "qE",
    transitions: {
        q0: { l:["q1","R"], d:["q1","R"] },
        q1: { l:["q2","R"], d:["q2","R"] },
        q2: { l:["q3","R"], d:["q3","R"] },
        q3: { l:["q4","R"], d:["q4","R"] },
        q4: { l:["q5","R"], d:["q5","R"] },
        q5: { l:["q6","R"], d:["q6","R"] },
        q6: { l:["q7","R"], d:["q7","R"] },
        q7: { l:["q8","R"], d:["q8","R"] },
        q8: { l:["q8","R"], d:["q8","R"], _: ["qA","S"] } 
    }
};
