import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opensi:false,
}

const signin = createSlice({
    name:'signin',
    initialState,
    reducers:{
        openSignin:(state,action)=>{
            state.opensi=true;
        },
        closeSignin:(state,action)=>{
            state.opensi=false;
        }
    }
})

export const {openSignin,closeSignin} = signin.action;

export default signin.reducer;