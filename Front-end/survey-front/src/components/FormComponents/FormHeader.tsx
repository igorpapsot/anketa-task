import { useState } from "react";
import ClientDropDown from "./ClientDropDown";
import ProjectDropDown from "./ProjectDropDown";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { clientUrl } from "../../global/env";

const FormHeader = () => {

    const [selectedClientId, setSelectedClientId] = useState<number>()

    const getClients = async () => {
        console.log("Getting clients...")
        const res = await axios.get(clientUrl);
        if (res && res.status == 200) {
            setSelectedClientId(res.data[0].id)
            return res
        }
    };

    const { data } = useQuery({
        queryKey: ['getClients'],
        queryFn: getClients,
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