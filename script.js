const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

const players = ['Playerwr', 'DevTech03', 'ishaanvats', 'pankaj1238','priyxnshukumar', 'VisheshSinghal1510', 'SIDDHARTHalsoNEGI', 
'crushergaming','I_M_A_Sniper', 'ipranjalpant', 'AkshatGarg1234', 'aaradhya0701', 'arjeetkitru', 'SanketD244','anmol_shuklaa', 
'Vkeves', 'ramkharbanda','YourOwnComrade', 'ujjwalchess3', 'Supriyo02', 'Manas_Bawari', 'Ishaan706', 'Albin77777', 
'dhruvv_bajaj', 'visionrajput','10Garv', 'namannn04', 'CHEEMSchessOP', 'DakshhJain',  'Ashutoshchezz',
'KRISH981155', 'Hashirama_shenju', 'Dev9076', 'dhruvrankoti', 'SIDDHARTH1357', 'Abhijitam', 'SARTHAK10710',
'mikhailtal345', 'alphaton', 'Arman202p', 'DAKUVANSH'];

let player_data = [];

let jsondata = [];

async function getUser() {
    for (const player of players) {
        const response = await fetch(`https://api.chess.com/pub/player/${player}/stats`);
        const data = await response.json();
        
        // if(data["chess_rapid"]["last"]["rating"]){
        // const rapid = data["chess_rapid"]["last"]["rating"];
        // }

        const rapid = data["chess_rapid"]?data["chess_rapid"]["last"]["rating"]:800;
        
        const blitz = data["chess_blitz"]?data["chess_blitz"]["last"]["rating"]:800;
        const bullet = data["chess_bullet"]?data["chess_bullet"]["last"]["rating"]:800;
        
        const dic = {
            [player]:[rapid, blitz, bullet]
        };
        jsondata.push(dic);
        player_data.push(data["chess_rapid"]["last"]["rating"]);
    }
}
// drawGraph();

async function drawGraph() {
    await getUser();

    let dic_string = JSON.stringify(jsondata);
    var fs = require('fs');
    fs.writeFile("chess_ratings.json", dic_string); 
    const ctx = document.getElementById('chart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: players,
            datasets: [{
                label: 'Chess Rating',
                data: player_data,
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