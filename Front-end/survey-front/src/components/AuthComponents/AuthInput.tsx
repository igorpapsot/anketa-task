const AuthInput = ({ label, state, setState, type }: { label: string; state: string; setState: any; type: string }) => {
    return (
        <>
            <label>{label}</label>
            <input value={state} onChange={(e) => setState(e.target.value)} type={type} placeholder={label} className="authInput button"></input>
        </>
    )
}

export default AuthInput