import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: "",
    reducers: {
        storeData: (state, action) => {
            return action.payload
        }
    }
})

export const {storeData} = searchSlice.actions;
export default searchSlice.reducer;