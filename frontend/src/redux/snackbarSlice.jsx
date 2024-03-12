import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false,
    message:"",
    severity:"success",
};
const snackbar = createSlice({
    name:'snackbar',
    initialState,
    refucers:{
        openSnackbar:(state,action)=>{
            state.open=true;
            state.message=action.payload.message;
            state.severity=action.payload.severity;
        },
        closeSnackbar:(state,action)=>{
            state.open=false;
        }
    }
})

export const {openSnackbar,closeSnackbar} =snackbar.action;
export default snackbar.reducer;