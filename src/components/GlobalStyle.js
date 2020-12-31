import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #c8d7e6;
        font-family: "Inter", sans-serif;
        color: #202020;
    }
    button{
        font-weight: bold;
        size: 1.1.rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border: 2px solid #2368a8;
        background: transparent;
        transition: all 0.5s ease;
        color: #2368a8;
        &:hover{
            background-color: #2368a8;
            color: #dfdfdf;
        }
        border-radius: 0.5rem;
    }
    h2{
        font-weight: lighter;
        font-size: 3.6rem;
        margin-bottom: 1rem;
    }
    p{
        font-size: 1.2rem;
    }
    input{
        background-color: #c9d5e6;
        padding: 0.5rem 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1.2rem;
        color: #2368a8;
        &:focus{
            border: 2px solid #2368a8;
            outline: none;
        }
    }
    span{
        font-weight: bold;
        color: #2368a8;
    }

`;

export default GlobalStyle;