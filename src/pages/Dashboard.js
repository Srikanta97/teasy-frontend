import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Picture from '../img/savingsExp.png';

const Dashboard = () => {

    const but = useRef();

    const [error, setError] = useState('');
    const [amountList, setAmountList] = useState([]);
    let [exp, setExp] = useState([]);
    let [sav, setSav] = useState([]);
    let savings = [];
    let expense = [];
    let totalExp = 0;
    let totalSav = 0;
    const history = useHistory();
    
    useEffect(() => {
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
    }, []);

    const loadData = () => {
        but.current.style.display = "none";
        setExp(...exp, amountList.map(amt =>
            amt.savings === "expenditure" ? amt.amount : null
        ));
        setSav(...sav, amountList.map(amt =>
            amt.savings === "savings" ? amt.amount : null
        ));
    }

    expense = exp.filter(ele => { return ele != null });
    //console.log(expense);
    savings = sav.filter(ele => { return ele != null });
    //console.log(savings);
    expense.map(amt => {
        totalExp = totalExp + amt;
    });
    //console.log(totalExp);
    savings.map(amt => {
        totalSav = totalSav + amt;
    })
    //console.log(totalSav);

    const data = {
        labels: ["Savings", "Expense"],
        datasets: [
            {
                label: "Savings vs Expense",
                data: [totalSav, totalExp],
                backgroundColor: ['#32cc65', '#e23232'],
            }
        ] 
    }

    return (
        <div style={{display: "flex", margin: "4rem 8rem", marginBottom:"2rem", justifyContent:"space-between", alignItems: "flex-start"}}>
            <img style={{marginRight:"1rem"}} src = {Picture} alt="ToDo image" />
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <header>
                    <h1>
                        Cash Flow
                    </h1>
                </header>
                <button ref={but} onClick={loadData}>See data</button>
                <Bar 
                    data={data}
                    height={325}
                    width={400}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
                        },
                        legend: {
                            labels: {
                                fontSize: 18,
                                fontFamily: 'Inter',
                                fontColor: '#2368a8'
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Dashboard;