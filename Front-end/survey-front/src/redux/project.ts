import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: { projectId: -1 },
    reducers: {
        setProjectId(state, actions) {
            state.projectId = actions.payload
        }
    }
})

export default projectSlice
export const projectActions = projectSlice.actions