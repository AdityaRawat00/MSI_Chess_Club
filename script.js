const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

let user_name = [];
let rapid = [];
let blitz = [];
let bullet = [];
let data = []
let avg_values = [];

async function getData(){
    const response = await fetch("https://randomsailor.pythonanywhere.com/");
    const data = await response.json();
    rapid = data["Rapid"];
    user_name = data["Username"];
    blitz = data["Blitz"];
    bullet = data["Bullet"];

    avg_values[0] = rapid.slice(-1);
    avg_values[1] = blitz.slice(-1);
    avg_values[2] = bullet.slice(-1);
    avg_values[3] = 1400;
}


async function displayGraphTable(current = 0){
    if (data.length == 0)
        await getData();
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
    while(tableBody.rows.length > 1)
    {
        tableBody.deleterow(1);
    }
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
        // maintainAspectRatio :false,
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