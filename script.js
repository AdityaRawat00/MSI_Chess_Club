const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

let user_name = [];
let rapid = [];
let blitz = [];
let bullet = [];
let data = []
let avg_values = [];

async function getData(){
    // const scriptPath = document.currentScript.src;
    // const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
    const csvPath = "chessdata.txt";
    const response = await fetch(csvPath);
    const data = await response.text();

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
    avg_values[3] = rows[rows.length-1].split(',')[4];
}


async function displayGraphTable(current = 0){
    //Rapid
    if(current == 0)
    drawGraphRapid(rapid, "tableRapid", "chartRapid");   
//Blitz
else if(current == 1)
drawGraphRapid(blitz, "tableBlitz", "chartBlitz"); 

//Bullet
else
drawGraphRapid(bullet, "tableBullet", "chartBullet"); 
}


async function drawGraphRapid(typeofgraph, tableId, chartId) {
    
    if (data.length == 0)
        await getData();
    
    data = user_name.map((username, index) => ({ username, rating: typeofgraph[index]}));
    
    // Sorting Data in ascending and desceding
    const ascendingData = [...data].sort((a, b) => a.rating - b.rating);
    const descendingData = [...data].sort((a, b) => b.rating - a.rating);
    
    const ascUserName = ascendingData.map(item=>item.username);
    const ascRating = ascendingData.map(item => item.rating);
    
    const desUserName = descendingData.map(item=>item.username);
    const descRating = descendingData.map(item=>item.rating);
    //end
    
    const tableBody = document.querySelector(`#${tableId} tbody`);
    let x = 0;
    let avgIndex = 20;
    for(let i = 0; i<rapid.length;i++){
        const row = tableBody.insertRow();
        x++;
        row.insertCell(0).textContent = x;
        row.insertCell(1).textContent = desUserName[i];
        row.insertCell(2).textContent = descRating[i];
        if(desUserName[i] == "avg"){
            avgIndex = i;
            console.log(i);
        }
    }
    
    document.getElementById("rapid").textContent = avg_values[0];
    document.getElementById("blitz").textContent = avg_values[1];
    document.getElementById("bullet").textContent = avg_values[2];
    document.getElementById("puzzle").textContent = avg_values[3];
    console.log(avg_values[3]);
    document.getElementById("total").textContent = rapid.length;
    
    const ctx = document.getElementById(`${chartId}`);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ascUserName,
            datasets: [{
                label: 'Chess Rating',
                data: ascRating,
                borderWidth: 1,
                backgroundColor: color=>{
                    let colors = color.index == (ascRating.length - avgIndex-1)? "#E56353":"#329AC7";
                    return colors;
                }
            },
        ],
    },
    options: {
        scales: {
            x: {
                ticks: {
                    autoSkip: false
                }
            },
        }
    }
});
}

//calling for default graph
openGraph('chartRapid','tableRapid', 0);

async function openGraph(graphType,tableType, cur)
{
    await displayGraphTable(cur);
    var i;
    var x = document.getElementsByClassName("ratingGraph");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    var y = document.getElementsByClassName("ratingTable");
    for(i = 0; i < y.length ; i++)
    {
        y[i].style.display = "none";
    }
    document.getElementById(graphType).style.display = "block";
    document.getElementById(tableType).style.display = "block";
}

//Not being used
function openTab(gameType)
{
    
    var i;
    var x = document.getElementsByClassName("optionContent");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    document.getElementById(gameType).style.display = "block";  
}