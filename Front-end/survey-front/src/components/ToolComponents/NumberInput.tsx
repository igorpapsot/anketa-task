const NumberInput = ({ label, state, setState, min, max }: { label: string; state: number; setState: any; min: number; max: number; }) => {
    return (
        <>
            <input value={state} onChange={(e) => setState(e.target.value)} type="number" min={min} max={max} placeholder={label} className="numberInput"></input>
        </>
    )
}

export default NumberInput