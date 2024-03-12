import React, { useState } from 'react'
import {IconButton, Modal} from "@mui/material"
import styled from 'styled-components';
import {Block,
        CloseRounded,
        EmailRounded,
        Visibility,
        VisibilityOff,
        PasswordRounded,
        TroubleshootRounded,

    } from "@mui/icons-material"
import CircularProgress from '@mui/material';
import { useDispatch } from 'react-redux';

const Container = styled.div``;
const Wrapper = styled.div``;
const SignIn = ({setSignInOpen,setSignUpOpen}) => {

    const [email,setEmail] =useState("");
    const [password,setPassord] =useState("");
    const [Loading,setLoading] = useState(false);
    const[disabled,setDisabled] = useState(true);
    const [values, setValues] = useState({
        password:"",
        showPassword:false,
    })

    const [showOTP,setShowOTP] =useState(false);
    const [otpVerified,setOptverified] = useState(false);

    const [showForgotPassword,setShowForgotPassword]=useState("");
    const [samepassword,setSamepassword]=useState("");
    const [confirmedpassword, setConfirmedpassword] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [resetDisabled, setResetDisabled] = useState(true);
    const [resettingPassword, setResettingPassword] = useState(false);
    const dispatch = useDispatch();

    
  return (
    <Modal>
        <Container>
            <Wrapper>
                <CloseRounded/>
            </Wrapper>
        </Container>
    </Modal>
  )
}

export default SignIn
