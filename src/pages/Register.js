import React,{useState, useContext} from 'react';
import styled from 'styled-components';
import SignUp from '../img/signUp.jpg';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../components/ErrorNotice';
import { motion } from 'framer-motion';
import { pageAnimation } from "../animation";
import { titleAnim } from "../animation";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        //console.log("Working...");
        e.preventDefault();
        try {
            const newUser = { email, password, passwordCheck, displayName };
            await Axios.post(
                "http://localhost:5000/users/register",
                newUser
            );
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                {
                    email, password
                }
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/main");
        }
        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <StyledDiv variants={pageAnimation} initial="hidden" animate="show">
            <motion.img variants={titleAnim} style={{paddingRight:"1rem"}} src={SignUp} alt="Person with a computer" />
            <StyledForm>
                {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                <input id="register-email" type="email" placeholder="Email"
                    onChange={ (e) => setEmail(e.target.value) }/>
                <input id="register-password" type="password" placeholder="Password"
                    onChange={ (e) => setPassword(e.target.value) }/>
                <input id="confirm-password" type="password" placeholder="Confirm Password"
                    onChange={ (e) => setPasswordCheck(e.target.value) }/>
                <input id="display-name" type="text" placeholder="Display Name"
                    onChange={ (e) => setDisplayName(e.target.value) }/>
                <button id="button" onClick={submit}>Submit</button>
            </StyledForm>
        </StyledDiv>
    )
}

const StyledDiv = styled(motion.div)`
    display: flex;
    padding: 5rem 10rem;
    justify-content: space-between;
    align-items: center;
    min-height: 88vh;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    input{
        margin-bottom: 1rem;
        width: 20rem;
        height: 3rem;
        background: #f0f4f8;
    };
    #button{
        margin-top: 0.5rem;
        width: 20rem;
        padding: 0.7rem 0rem;
    }
`;

export default Register;