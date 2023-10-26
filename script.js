const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

let user_name = [];
let rapid = [];
let blitz = [];
let bullet = [];

let avg_values = [];

async function getData(){
    const scriptPath = document.currentScript.src;
    const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
    const csvPath = basePath + "chessdata.txt";
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
    avg_values[0] = rapid.slice(-1);
    avg_values[1] = blitz.slice(-1);
    avg_values[2] = bullet.slice(-1);
    // console.log(rows)
}

drawGraph();


async function drawGraph() {
    await getData();

    const data = user_name.map((username, index) => ({ username, rating: rapid[index]}));

// Sort data by rating in ascending order
    const ascendingData = [...data].sort((a, b) => a.rating - b.rating);
    const descendingData = [...data].sort((a, b) => b.rating - a.rating);

    const ascUserName = ascendingData.map(item=>item.username);
    const ascRating = ascendingData.map(item => item.rating);

    const desUserName = descendingData.map(item=>item.username);
    const descRating = descendingData.map(item=>item.rating);

    // console.log(ratingsArray)

    const tableBody = document.querySelector("#myTable tbody");
    let x = 0;
    for(let i = 0; i<rapid.length;i++){
        const row = tableBody.insertRow();
        x++;
        row.insertCell(0).textContent = x;
        row.insertCell(1).textContent = desUserName[i];
        row.insertCell(2).textContent = descRating[i];
    }

    document.getElementById("rapid").textContent = avg_values[0];
    document.getElementById("blitz").textContent = avg_values[1];
    document.getElementById("bullet").textContent = avg_values[2];
    document.getElementById("total").textContent = rapid.length;

    const ctx = document.getElementById('chart');
       new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ascUserName,
            datasets: [{
                label: 'Chess Rating',
                data: ascRating,
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


function openTab(gameType)
{
    
  var i;
  var x = document.getElementsByClassName("optionContent");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(gameType).style.display = "block";  
}

