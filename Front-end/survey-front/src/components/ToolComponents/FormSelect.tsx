import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { clientUrl } from "../../global/env";
import ProjectDropdown from "./ProjectDropdown";
import ClientDropDown from "./ClientDropDown";

const FormSelect = ({ setSelectedProjectId, stats }: { setSelectedProjectId?: any; stats: boolean }) => {

    const [selectedClientId, setSelectedClientId] = useState<number>(-1)

    const getClients = async () => {
        console.log("Getting clients...")
        const res = await axios.get(clientUrl);
        if (res && res.status == 200) {
            return res
        }
    };

    const { data } = useQuery({
        queryKey: ['getClients'],
        queryFn: getClients,
    });

    return (
        <>
            <ClientDropDown clients={data?.data} clientId={selectedClientId} setSelectedClient={setSelectedClientId} />
            <ProjectDropdown selectedClient={selectedClientId} stats={stats} setProjectId={setSelectedProjectId} />
        </>
    )
}

export default FormSelect;