interface DropdownProps<T> {
    values: T[] | undefined;
    setSelected: (value: any) => void;
    selectedValue: number;
    label: string;
}


const Dropdown = <T extends { id: number, value: string }>({ values, setSelected, selectedValue, label }: DropdownProps<T>) => {

    if (values == undefined) {
        return (
            <>
                {label}
                <select className="dropdown">
                    {label === "Project" ? <option>Select client first</option> : <option>No values found</option>}

                </select>
            </>
        )
    }

    return (
        <>
            <label>{label}:</label>
            <select className="dropdown" onChange={(e) => { setSelected(Number(e.target.value)) }}>
                {selectedValue === -1 && <option value={-1} hidden>Select {label}</option>}
                {values.length === 0 && <option disabled>No {label} found</option>}
                {values.map((c: T) => {
                    return <option value={c.id} key={c.id}>{c.value}</option>
                })}
            </select>
        </>

    )
}

export default Dropdown