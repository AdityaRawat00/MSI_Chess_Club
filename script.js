const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

let user_name = [];
let rapid = [];
let blitz = [];
let bullet = [];

async function getData(){
    const scriptPath = document.currentScript.src;
    const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
    const csvPath = basePath + "chess_data.csv";
    const response = await fetch(csvPath);
    const data = await response.text();
    // console.log(data);

    const rows = data.split("\r\n").slice(1, -1);

    for(let ele of rows){
        const row = ele.split(',')
        user_name.push(row[0])
        rapid.push(row[1])
        blitz.push(row[2])
        bullet.push(row[3])
    }
    // console.log(rows)
}

drawGraph();


async function drawGraph() {
    await getData();
    for(let i = 0; i<user_name.length;i++){
        for(let j=0; j<user_name.length-i-1;j++){
            if (parseInt(rapid[j])>parseInt(rapid[j+1])){
                let tempr = rapid[j];
                let tempn = user_name[j];

                rapid[j] = rapid[j+1];
                user_name[j] = user_name[j+1];

                rapid[j+1] = tempr;
                user_name[j+1] = tempn;
            }
        }
    }
    console.log(rapid)

    const ctx = document.getElementById('chart');
       new Chart(ctx, {
        type: 'bar',
        data: {
            labels: user_name,
            datasets: [{
                label: 'Chess Rating',
                data: rapid,
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



