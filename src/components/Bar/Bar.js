function Bar(props) {
    return (
        <div>
            <label>{props.children}</label>
            <meter className="bar"></meter>
        </div>
    )
}

export default Bar;