import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = () => {
    const { userData, setUserData } = useContext(UserContext);
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }
    return (
        <StyledNav>
            <h1><Link to="/">Productivity Manager</Link></h1>
            {
                userData.user ?
                    <ul>
                        <li>
                                <button>
                                <Link to="/main">
                                    Todo
                                </Link>
                            </button>
                            <button>
                                <Link to="/expense">
                                    Finance
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button onClick={logout}>
                                <Link to="/">
                                    Logout
                                </Link>
                            </button>
                        </li>
                    </ul>:
                    <ul>
                        <li>
                            <button>
                            <Link to="/">
                                    Home
                            </Link>
                            </button>
                        </li>
                        <li>
                            <button>
                            <Link to="/register">
                                    Sign Up
                            </Link>
                            </button>
                        </li>
                    </ul>
            }
            
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    min-height: 10vh;
    background-color: #a2c4e7;
    display: flex;
    margin: auto;
    padding: 1rem 10rem;
    justify-content: space-between;
    align-items: center;
    a{
        text-decoration: none;
        color: #2368a8;
        font-size: 1.5rem;
        font-weight: lighter;
        font-family: "Lobster", cursive;
        cursor: pointer;
    }
    ul{
        display: flex;
        list-style: none;
    }
    button{
        border: none;
        margin-left: 4rem;
        width: auto;
        text-align: center;
        a{
            font-size: 1.2rem;
        }
        padding: 0.5rem;
        width: auto;
        &:hover{
            background: #2368a8;
            a{
                color: #a2c4e7;
            };
        }
    }
    input{
        margin: 0rem;
    }
`;

export default Nav;