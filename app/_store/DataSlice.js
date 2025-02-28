import { createSlice } from "@reduxjs/toolkit";

export const DataSlice = createSlice({
    name: "formdata",
    initialState: {
        FormDataCollection: null,
        AuthUserDetails: null

    },
    reducers: {
        setFormDataCollection: (state, action) => {
            state.FormDataCollection = action.payload;
        },
        setAuthUserDetails: (state, action) => {
            state.AuthUserDetails = action.payload;
        },
    },
});
export const { setFormDataCollection ,setAuthUserDetails} = DataSlice.actions;
export default DataSlice.reducer;