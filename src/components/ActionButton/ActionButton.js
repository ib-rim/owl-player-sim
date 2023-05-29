import './ActionButton.css';

function ActionButton(props) {
    return (
        <button className="action-button">{props.children}</button>
    ) 
}

export default ActionButton;