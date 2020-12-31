import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import thoughts from '../img/thoughts.png';
import styled from 'styled-components';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../components/ErrorNotice';
import { motion } from 'framer-motion';
import { pageAnimation } from "../animation";
import { titleAnim } from "../animation";

const Home = () => {
    const { setUserData } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        try {
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                {
                    email, password
                }
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/main");
        }
        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    return (
        <>
        {
            <StyledAbout variants={pageAnimation} initial="hidden" animate="show">
                <div className="description">
                    <motion.div className="title">
                        <StyledHide>
                            <motion.h2 variants={titleAnim}>Spend time</motion.h2>
                        </StyledHide>
                        <StyledHide>
                            <motion.h2 variants={titleAnim}>on what really</motion.h2>
                        </StyledHide>
                        <StyledHide>
                            <motion.h2 variants={titleAnim}><span>MATTERS</span></motion.h2>
                        </StyledHide>
                    </motion.div>
                    <StyledThoughts>
                        <img src={thoughts} alt="logo" />
                        <p>
                            Digitize your <span>thoughts</span>!
                        </p>
                    </StyledThoughts>
                </div>
                <StyledCredentials>
                    {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                    <form>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Username" />
                        <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                        <button id="button" onClick={login}>Log In</button>
                    </form>
                </StyledCredentials>
            </StyledAbout>
        }
        </>
    )
}

const StyledAbout = styled(motion.div)`
    min-height: 88vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 10rem;
`;

const StyledThoughts = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        font-size: 1.4rem;
    }
`;

const StyledCredentials = styled.div`
    form{
        display: flex;
        flex-direction: column;
        input{
            width: 20rem;
            height: 3rem;
            margin-bottom: 1rem;
            background-color: #f0f4f8;
        }
        #button{
            margin-top: 0.5rem;
            width: 20rem;
            padding: 0.7rem 0rem;
        }
    }
`;

const StyledHide = styled.div`
    overflow: hidden;
`;

export default Home;