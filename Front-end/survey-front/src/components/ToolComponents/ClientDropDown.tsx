const ClientDropDown = ({ clients, clientId, setSelectedClient }: { clients: Client[] | undefined, setSelectedClient: any; clientId: number }) => {

    const label = <label>Client:</label>;

    const selectHandler = (val: string) => {
        setSelectedClient(Number(val))
    }

    if (clients == undefined) {
        return (
            <>
                {label}
                <select className="dropdown button">
                    <option>No clients found</option>
                </select>
            </>
        )
    }

    return (
        <>
            {label}
            <select className="dropdown button" onChange={(e) => { selectHandler(e.target.value) }}>
                {clientId === -1 && <option value={-1} hidden>Select client</option>}
                {clients.map((c: Client) => {
                    return <option value={c.id} key={c.id}>{c.name}</option>
                })}
            </select>
        </>
    )
}

export default ClientDropDown;