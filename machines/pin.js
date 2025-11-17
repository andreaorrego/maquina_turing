export const pinMachine = {
    start: "q0",
    accept: "qA",
    reject: "qE",
    transitions: {
        q0: { d:["q1","R"] },
        q1: { d:["q2","R"] },
        q2: { d:["q3","R"] },
        q3: { d:["q4","R"] },
        q4: { d:["q5","R"], _: ["qA","S"] }, 
        q5: { d:["q6","R"] },  
        q6: { _: ["qE","S"], _: ["qA","S"] } 
    }
};
