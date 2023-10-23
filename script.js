const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

let player_data = [];
let user_name = [];

let jsondata = [];

fetch("chess_data.csv")
    .then(response=>response.text())
    .then(csvdata => {
        const row = csvdata.split("\n").map(row => row.split(","))
        for(let r of row) 
            jsondata.push(row);
    });
console.log(jsondata);

drawGraph();

function drawGraph() {
    const ctx = document.getElementById('chart');
       new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['a','b','c', 'd', 'e'],
            datasets: [{
                label: 'Chess Rating',
                data: [1,3,5,6,7],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



