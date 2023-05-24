import './App.css';
import Bar from './components/Bar/Bar';
import ActionButton from './components/ActionButton/ActionButton';

function App() {
    return (
        <div className="App">
            <div className="player-display">
                <button className="help-button">?</button>
                <img src="" alt={`${'playerName'}`} className="player-photo" />
                <div className="mood-display">

                </div>
            </div>
            <div className="player-stats">
                <Bar statistic="mental">Mental</Bar>
                <Bar statistic="gamesense">Game Sense</Bar>
                <Bar statistic="mechanics">Mechanics</Bar>
                <Bar statistic="health">Physical Health</Bar>
            </div>
            <div className="actions">
                <ActionButton>Scrim</ActionButton>
                <ActionButton>Exercise</ActionButton>
                <ActionButton>Relax</ActionButton>
                <ActionButton>Ranked</ActionButton>
                <button>Change player name</button>
            </div>
            <div className="log">

            </div>
        </div>
    );
}

export default App;
