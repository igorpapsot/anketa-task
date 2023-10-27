const WeightVersionSelect = ({ versions, version, setVersion }: { versions: WeightVersion[]; version: number; setVersion: any }) => {

    const selectHandler = (val: string) => {
        setVersion(val)
    }

    const label = <label>Weight version:</label>

    if (versions == undefined) {
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
                {version === -1 && <option value={-1} hidden>Select weight version</option>}
                {versions.length === 0 && <option disabled>No versions found</option>}
                {versions.map((c: WeightVersion) => {
                    return <option value={c.id} key={c.id}>{c.versionName}</option>
                })}
            </select>
        </>

    )
}

export default WeightVersionSelect