const DashboardDelete = (props) => {
    const gameId = props.match.params.id;
    return (
        <div>
            <p>Vo queré borra id = {gameId}</p>
        </div>
    )
}

export default DashboardDelete