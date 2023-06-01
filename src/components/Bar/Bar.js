import './Bar.css';

function Bar(props) {

    return (
        <div className="bar">
            <label className="bar-label" htmlFor="bar-meter">{props.children}</label>
            <meter className="bar-meter" id="bar-meter" value={props.value} max={props.max} state={props.value <= 15 ? "danger" : props.value <= 35 ? "warning" : "healthy"}></meter>
        </div>
    )
}

export default Bar;