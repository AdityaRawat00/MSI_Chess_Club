const url = "https://api.chess.com/pub/player/{Player}/stats";

const players = ["yourowncomrade", "vinayyd", "i_m_a_sniper", "ipranjalpant"];
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
