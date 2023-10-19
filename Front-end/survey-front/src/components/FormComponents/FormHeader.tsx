import { useState } from "react";
import ClientDropDown from "./ClientDropDown";
import ProjectDropDown from "./ProjectDropDown";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { clientUrl } from "../../global/env";

export const getClient = async () => {
    return await axios.get(clientUrl);
};

const FormHeader = () => {

    //const [clients, setClients] = useState<Client[]>()
    const [selectedClientId, setSelectedClientId] = useState<number>()

    const { data } = useQuery({
        queryKey: ['getClient'],
        queryFn: getClient,
    });

    return (
        <div className="formHeader">
            <h1>Survey for evaluating clients</h1>
            <ClientDropDown clients={data?.data} setSelectedClient={setSelectedClientId} />
            <ProjectDropDown selectedClient={selectedClientId} />
        </div>
    )
}

export default FormHeader;