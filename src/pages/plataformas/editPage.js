const DashboardModify = (props) => {
    const gameId = props.match.params.id;
    return (
        <div>
            <p>Vo queré modificar id = {gameId}</p>
        </div>
    )
}

export default DashboardModify