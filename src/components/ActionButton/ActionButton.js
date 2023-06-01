import './ActionButton.css';

function ActionButton(props) {
    return (
        <button className="action-button" onClick={props.onClick}>{props.children}</button>
    ) 
}

export default ActionButton;