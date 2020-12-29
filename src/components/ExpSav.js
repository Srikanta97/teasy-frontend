import React from 'react';
import Axios from 'axios';

const ExpSav = ({ title, amount, amountList, setAmountList }) => {

    const deleteExpenseHandler = async (e) => {
        e.preventDefault();
        try {
            await Axios.delete(
                `https://teasy-backend.herokuapp.com/expense/${amount.id}`,
                {
                    headers: {
                        "Content-type":"application/json",
                        "x-auth-token": `${localStorage.getItem("auth-token")}`
                    }
                }
            ).then((res) => {
                console.log(res.data);
            });
        }
        catch(err) {
            console.log(err.response.data.msg) ;
        }
        setAmountList(amountList.filter(ele => (
            ele.id !== amount.id
        ))
        );
    }

    return (
        <div className="todo">
            <li style={{display:"flex", justifyContent:"space-between"}} >
                <div style={{fontWeight:"normal"}} className={`todo-item ${amount.savings === "expenditure" ? "expense" : ""}`}>{title}</div>
                <div style={{marginRight:"1rem"}} className={`todo-item ${amount.savings === "expenditure" ? "expense" : ""}`}>{amount.amount}</div>
            </li>
            <button onClick={deleteExpenseHandler} className={`trash-btn ${amount.savings === "expenditure" ? "expense" : ""}`}><i className="fas fa-trash "></i></button>       
        </div>
    )
}

export default ExpSav;