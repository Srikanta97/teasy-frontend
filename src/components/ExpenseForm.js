import React,{useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';

const TodoForm = ({ amountList, setAmountList, inputText, setInputText, inputAmount, setInputAmount }) => {
    let [id, setId] = useState("");
    let [title, setTitle] = useState("");
    let [amount, setAmount] = useState("");
    let [savings, setSavings] = useState("");
    const [error, setError] = useState("");

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }

    const inputAmountHandler = (e) => {
        setInputAmount(e.target.value);
    }

    const submitExpenseHandler = async (e) => {
        e.preventDefault();
        setTitle(title = inputText);
        setId(id = uuidv4());
        setAmount(amount = inputAmount);
        setSavings(savings = "expenditure");
        try {
            const list = { title, id, amount, savings };
            //console.log(list);
            await Axios.post(
                "https://teasy-backend.herokuapp.com/expense/",
                list,
                {
                    headers: {
                        "Content-type": "application/json",
                        "x-auth-token": `${localStorage.getItem("auth-token")}`
                    }
                }
            ).then((res) => {
                console.log(res.data.title);
            });
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
        inputText.length > 0 ?
            setAmountList([
                ...amountList, {
                    title,
                    id,
                    amount,
                    savings
                }
            ]) : setInputText("");
        setInputText("");
        setInputAmount('');
    };

    const submitSavingsHandler = async (e) => {
        e.preventDefault();
        setTitle(title = inputText);
        setId(id=uuidv4());
        setAmount(amount = inputAmount);
        setSavings(savings = "savings");
        try {
            const list = { title, id, amount, savings };
            //console.log(list);
            await Axios.post(
                "https://teasy-backend.herokuapp.com/expense/",
                list,
                {
                    headers: {
                        "Content-type":"application/json",
                        "x-auth-token": `${localStorage.getItem("auth-token")}`
                    }
                }
            ).then((res) => {
                console.log(res.data.title);
            });
        }
        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
        inputText.length > 0 ?
        setAmountList([
            ...amountList,{
                title,
                id,
                amount,
                savings
            }
        ]) : setInputText("") ;
        setInputText("");
        setInputAmount("");
    }

    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
            <input value={inputAmount} onChange={inputAmountHandler} type="number" style={{width: "7rem"}} />
            <button onClick={submitSavingsHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <button onClick={submitExpenseHandler} className="todo-button" type="submit">
                <i className="fas fa-minus-square"></i>
            </button>
        </form>
    )
}

export default TodoForm;