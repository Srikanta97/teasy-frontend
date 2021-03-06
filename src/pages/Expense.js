import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../todo.css';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Picture from '../img/expense.png';
import Axios from 'axios';
import { pageAnimation } from "../animation";
import { motion } from 'framer-motion';
import { titleAnim } from "../animation";

const Main = () => {
    const [inputText, setInputText] = useState("");
    const [amountList, setAmountList] = useState([]);
    const [inputAmount, setInputAmount] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect( () => {
        if (!localStorage.getItem("auth-token")) {
            history.push('/login');
        }
        const loadFun = async () => {
            try {
                await Axios.get(
                    "http://localhost:5000/expense/all",
                    {
                        headers: {
                            "Content-type": "application/json",
                            "x-auth-token": `${localStorage.getItem("auth-token")}`
                        }
                    }
                ).then((res) => {
                    setAmountList(res.data);
                });
            }
            catch (err) {
                err.response.data.msg && setError(err.response.data.msg);
                console.log(error);
            }
        }
        loadFun();
    },[]);

    return (
        <motion.div style={
            {
                display: "flex",
                margin: "4rem 8rem",
                justifyContent: "space-between",
                alignItems: "flex-start",
                minHeight: "88vh"
            }
        } variants={pageAnimation} initial="hidden" animate="show">
            <motion.img variants={titleAnim} style={{marginRight:"1rem"}} src = {Picture} alt="Expense tracker" />
            <div>
                <header>
                    <h1>
                        Expense Tracker
                    </h1>
                </header>
                <ExpenseForm
                    amountList={amountList}
                    setAmountList={setAmountList}
                    inputText={inputText}
                    setInputText={setInputText}
                    inputAmount={inputAmount}
                    setInputAmount={setInputAmount}
                />
                <ExpenseList amountList={amountList} setAmountList={setAmountList}/>
            </div>
        </motion.div>
    )
};

export default Main;