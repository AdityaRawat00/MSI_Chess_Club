const url = "https://api.chess.com/pub/player/{Player}/stats";
const datalink = "https://docs.google.com/spreadsheets/d/1t3dnHg8SWWsiSEbYSCvPATRly2nMUb4KXXHFKf0uZlU/edit#gid=379472038";

// const players = ["yourowncomrade", "vinayyd", "i_m_a_sniper", "ipranjalpant"];
const players = ['I_M_A_Sniper', 'ipranjalpant', 'AkshatGarg1234', 'aaradhya0701', 'arjeetkitru', 'SanketD244','anmol_shuklaa', 
                'Vkeves', 'ramkharbanda','YourOwnComrade', 'ujjwalchess3', 'Supriyo02', 'Manas_Bawari', 'Ishaan706', 'Albin77777', 
                'dhruvv_bajaj', 'visionrajput','10Garv', 'namannn04', 'CHEEMSchessOP', 'DakshhJain',  'Ashutoshchezz',
                'KRISH981155', 'Hashirama_shenju', 'Dev9076', 'dhruvrankoti', 'SIDDHARTH1357', 'Abhijitam', 'SARTHAK10710',
                'mikhailtal345', 'alphaton', 'Arman202p', 'DAKUVANSH', 'Playerwr', 'DevTech03']
// , , , , 'Playerwr', 'DevTech03', 'ishaanvats', 'pankaj1238','priyxnshukumar', 'VisheshSinghal1510', 'SIDDHARTHalsoNEGI', 'crushergaming']
let player_data = [];

async function getUser() {
    // Use map to create an array of promises
    const promises = players.map(async function (d) {
        const response = await fetch(`https://api.chess.com/pub/player/${d}/stats`);
        const data = await response.json();
        return data["chess_rapid"]["last"]["rating"];
    });

    // Wait for all promises to resolve
    player_data = await Promise.all(promises);

    console.log(player_data);
}

drawGraph();

async function drawGraph() {
    await getUser();
    console.log("Second");
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

console.log("Script is working");
