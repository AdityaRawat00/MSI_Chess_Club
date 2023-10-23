const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

let player_data = [];
let user_name = [];

let chess_data = [];
let abcabc = []

async function getData(){
    const response = await fetch("chess_data.csv");
    const data = await response.text();
    // console.log(data);

    const rows = data.split("\r\n").slice(1);

    for(let ele of rows){
        const row = ele.split(',')
        abcabc.push(row[0])
        chess_data.push([row[1], row[2], row[3]])
    }
    // console.log(rows)
}
aaaa();
async function aaaa(){
    await getData();
    console.log(abcabc[5], chess_data[5])
}
// console.log(typeof(abcabc))

// drawGraph();

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



