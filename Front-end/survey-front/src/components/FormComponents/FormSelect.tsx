import { useState } from "react";
import ClientDropDown from "./ClientDropDown";
import ProjectDropDown from "./ProjectDropDown";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { clientUrl } from "../../global/env";

const FormSelect = () => {

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
        <div className="dropDownPage">
            <h1>Survey for evaluating clients</h1>
            <ClientDropDown clients={data?.data} clientId={selectedClientId} setSelectedClient={setSelectedClientId} />
            <ProjectDropDown selectedClient={selectedClientId} />
        </div>
    )
}

export default FormSelect;