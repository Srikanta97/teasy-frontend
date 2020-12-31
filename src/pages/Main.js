import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../todo.css';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Picture from '../img/todo.png';
import Axios from 'axios';
import { pageAnimation } from "../animation";
import { motion } from 'framer-motion';
import { titleAnim } from "../animation";

const Main = () => {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const history = useHistory();
    
    useEffect( () => {
        if (!localStorage.getItem("auth-token")) {
            history.push('/login');
        }
        const loadFun = async () => {
            try {
                await Axios.get(
                    "http://localhost:5000/todos/all",
                    {
                        headers: {
                            "Content-type": "application/json",
                            "x-auth-token": `${localStorage.getItem("auth-token")}`
                        }
                    }
                ).then((res) => {
                    //console.log(res.data[0].title);
                    setTodos(res.data);
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
        <motion.div
            style={
                {
                    display: "flex",
                    margin: "4rem 8rem",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    minHeight: "88vh"
                }
            } variants={pageAnimation} initial="hidden" animate="show">
            <motion.img variants={titleAnim} style={{marginRight:"1rem"}} src = {Picture} alt="ToDo" />
            <div>
                <header>
                    <h1>
                        Todo List
                    </h1>
                </header>
                <TodoForm todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} />
                <TodoList todos={todos} setTodos={setTodos}/>
            </div>
        </motion.div>
    )
};

export default Main;