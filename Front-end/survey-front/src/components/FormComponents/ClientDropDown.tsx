import { useDispatch } from "react-redux";
import { projectActions } from "../../redux/project";

const ClientDropDown = ({ clients, setSelectedClient }: { clients: Client[] | undefined, setSelectedClient: any }) => {

    const dispatch = useDispatch()

    const label = <label>Client:</label>;

    const selectHandler = (val: string) => {
        setSelectedClient(Number(val))
        dispatch(projectActions.setProjectId(-1))
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
                {clients.map((c: Client) => {
                    return <option value={c.id} key={c.id}>{c.name}</option>
                })}
            </select>
        </>
    )
}

export default ClientDropDown;