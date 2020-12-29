import React from 'react';
import styled from 'styled-components';

const ErrorNotice = (props) => {
    return (
        <StyledNotice>
            <span style={{textAlign:"center"}}>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </StyledNotice>
    )
}

const StyledNotice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        margin-bottom: 0.5rem;
    }
    button{
        width: 3rem;
        margin-bottom: 0.5rem;
        text-align: center;
    }
`;

export default ErrorNotice;