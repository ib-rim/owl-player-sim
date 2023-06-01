import './App.css';
import Bar from './components/Bar/Bar';
import ActionButton from './components/ActionButton/ActionButton';
import { useState, useEffect } from 'react';

function App() {

    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);

    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState({});

    const [teams, setTeams] = useState({});
    const [team, setTeam] = useState({});

    const [maxBarValue, setMaxBarValue] = useState(50);

    const [mentalValue, setMentalValue] = useState(maxBarValue);
    const [gameSenseValue, setGameSenseValue] = useState(maxBarValue);
    const [mechanicsValue, setMechanicsValue] = useState(maxBarValue);
    const [physicalHealthValue, setPhysicalHealthValue] = useState(maxBarValue);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("owlData"));
        if (!data) {
            getAccessToken();
        }
        else {
            handleData(data);
        }
    }, [])

    //Get API access token through bnet authentication
    const getAccessToken = async () => {
        const response = await fetch("https://oauth.battle.net/token", {
            body: "grant_type=client_credentials",
            headers: {
                "Authorization": "Basic ZDAzZTFhYTdlMDEzNDJmZDg5YzY2ZTM1MDkyODFhZjM6Z01oQ1hkY3BTYUtrYk83NmRBdHM0QUpnOHI5cDRwWVU=",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        const promise = response.json();
        if (response.ok) {
            promise.then((data) => {
                fetchOWLData(data.access_token);
            })
        }
    }

    //GET OWL data using API access token
    const fetchOWLData = async (accessToken) => {
        const response = await fetch(`https://us.api.blizzard.com/owl/v1/owl2?access_token=${accessToken}`);
        const promise = response.json();
        if (response.ok) {
            promise.then((data) => {
                localStorage.setItem("owlData", JSON.stringify(data));
                handleData(data);
            })
        }
    }

    const handleData = (data) => {
        let players = Object.values(data.players);
        let teams = data.teams;
        setPlayers(players);
        setTeams(data.teams);

        let player;
        for (let i = 0; i < players.length && !player; i++) {
            const currentPlayer = players[i];
            if (currentPlayer.name.toLowerCase() === playerName.toLowerCase()) {
                player = currentPlayer;
            }
        }

        if (player && player.currentTeam) {
            let team = teams[player.currentTeam];
            setTeam(team);
            setPlayer(player);
        }
    }

    const savePlayerName = () => {
        setShowNameInput(false);
        handleData(JSON.parse(localStorage.getItem("owlData")));
    }

    const scrim = () => {
        handleValueChange(gameSenseValue + 3, setGameSenseValue);
        handleValueChange(physicalHealthValue - 3, setPhysicalHealthValue);
    }

    const exercise = () => {
        handleValueChange(physicalHealthValue + 3, setPhysicalHealthValue);
        handleValueChange(mechanicsValue - 3, setMechanicsValue);
    }

    const relax = () => {
        handleValueChange(mentalValue + 3, setMentalValue);
        handleValueChange(gameSenseValue - 3, setGameSenseValue);
    }

    const ranked = () => {
        handleValueChange(mechanicsValue + 3, setMechanicsValue);
        handleValueChange(mentalValue - 3, setMentalValue);
    }

    //Limit bar value to stay between 0 and 50
    const handleValueChange = (newValue, fn) => {
        if (newValue > maxBarValue) {
            newValue = maxBarValue;
        }
        else if (newValue < 0) {
            newValue = 0;
        }
        fn(newValue);
    }

    return (
        <div className="App">
            <div className="player-display">
                <button className="help-button">?</button>
                <img src={player.headshotUrl} alt={`${player.name || ""}`} className="player-photo" />
                <div className="mood-display">

                </div>
            </div>
            <div className="player-name" style={{ backgroundColor: `#${team.primaryColor}`, color: `#${team.secondaryColor}` }}>
                {showNameInput
                    ?
                    <>
                        <input placeholder="Player Name" onInput={e => setPlayerName(e.target.value)} type="text" name="player-name" id="player-name" />
                        <button onClick={() => savePlayerName()}>Save</button>
                    </>
                    :
                    <>{player.name}</>
                }
            </div>
            <div className="player-stats">
                <Bar max={maxBarValue} value={mentalValue}>Mental</Bar>
                <Bar max={maxBarValue} value={gameSenseValue}>Game Sense</Bar>
                <Bar max={maxBarValue} value={mechanicsValue}>Mechanics</Bar>
                <Bar max={maxBarValue} value={physicalHealthValue}>Physical Health</Bar>
            </div>
            <div className="actions">
                <div className="action-buttons">
                    <ActionButton onClick={() => scrim()}>Scrim</ActionButton>
                    <ActionButton onClick={() => exercise()}>Exercise</ActionButton>
                    <ActionButton onClick={() => relax()}>Relax</ActionButton>
                    <ActionButton onClick={() => ranked()}>Ranked</ActionButton>
                    <button onClick={() => setShowNameInput(true)}>Change player name</button>
                </div>
                <div className="log">
                </div>
            </div>
        </div>
    );
}

export default App;
