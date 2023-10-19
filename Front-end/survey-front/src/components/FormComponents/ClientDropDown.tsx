const ClientDropDown = ({ clients, setSelectedClient }: { clients: Client[] | undefined, setSelectedClient: any }) => {

    const label = <label>Client:</label>;

    const selectHandler = (val: string) => {
        setSelectedClient(Number(val))
    }

    if (clients == undefined) {
        return (
            <>
                {label}
                <select className="clientDropdown button">
                    <option>No clients found</option>
                </select>
            </>
        )
    }

    return (
        <>
            {label}
            <select className="clientDropdown button" onChange={(e) => { selectHandler(e.target.value) }}>
                {clients.map((c: Client) => {
                    return <option value={c.id} key={c.id}>{c.name}</option>
                })}
            </select>
        </>
    )
}

export default ClientDropDown;