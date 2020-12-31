import React,{useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import ErrorNotice from './ErrorNotice';

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
                "http://localhost:5000/expense/",
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
        inputText.length > 0 && inputAmount.length > 0 ?
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
                "http://localhost:5000/expense/",
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
        inputText.length > 0 && inputAmount.length > 0 ?
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
        <div style={{display:"flex", flexDirection:"column"}}>
            <form>
                <input placeholder="Eg: Newspaper" value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
                <input placeholder="Amt" value={inputAmount} onChange={inputAmountHandler} type="number" style={{width: "7rem"}} />
                <button onClick={submitSavingsHandler} className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <button onClick={submitExpenseHandler} className="todo-button" type="submit">
                    <i className="fas fa-minus-square"></i>
                </button>
            </form>
            {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
        </div>
    )
}

export default TodoForm;