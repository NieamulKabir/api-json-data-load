const allPlayers = () => {
    document.getElementById('player-container').innerHTML = '';
    document.getElementById('spinner').style.display = 'block'
    const searchValue = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.player == null) {
                document.getElementById('spinner').style.display = 'block'
            }
            else {
                showPlayersDetails(data.player);
                document.getElementById('spinner').style.display = 'none'
            }
        })
    document.getElementById('search-box').value = '';
}

const showPlayersDetails = (players) => {

    for (let player of players) {
        const playersDetails = document.getElementById('player-container');

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-3 m-3">
            <div class="pro-pic">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>Name: ${player.strPlayer} </h2>
            <h5>Country: ${player.strNationality} </h5>
            <p></p>
            <div class="allbutton">
                <button class="btn btn-danger">Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
         </div>
    `;
        playersDetails.appendChild(div)

    }
}

const details = (id) => {

    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]))
}

const setDetails = (playerInfo) => {

    if (playerInfo.strGender == "Male") {
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    }
    else {
        document.getElementById('male').style.display = "none";
        document.getElementById('female').style.display = "block";
    }

    const playerDetails = document.getElementById('details-container');
    const div = document.createElement('div');
    playerDetails.textContent = ''
    div.innerHTML = `
        <div class="card border p-3 m-3">
            <div class="pro-pic">
                <img class="w-50" src="${playerInfo.strThumb}" alt="">
            </div>
            <h2>Name: ${playerInfo.strPlayer} </h2>
            <h5>Country: ${playerInfo.strNationality} </h5>
            <h6> Gender: ${playerInfo.strGender}</h6>
            <p>Discription: ${playerInfo.strDescriptionEN.slice(0, 100)} ...</p>
     </div>
`;
    playerDetails.appendChild(div)
}
