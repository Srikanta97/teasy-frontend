import React,{useState, useContext} from 'react';
import styled from 'styled-components';
import SignUp from '../img/signUp.jpg';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../components/ErrorNotice';

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
                "https://teasy-backend.herokuapp.com/users/register",
                newUser
            );
            const loginRes = await Axios.post(
                "https://teasy-backend.herokuapp.com/users/login",
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
        <StyledDiv>
            <img src={SignUp} alt="Person with a computer" />
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

const StyledDiv = styled.div`
    display: flex;
    padding: 5rem 10rem;
    justify-content: space-between;
    align-items: center;
    height: 88vh;
`;

const StyledForm = styled.form`
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input{
        margin-bottom: 1rem;
        width: 20rem;
        height: 3rem;
        background: #f0f4f8;
    };
    #button{
        width: 20rem;
        height: 2.6rem;
        font-size: 1rem;
    }
`;

export default Register;