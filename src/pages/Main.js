import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../todo.css';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Axios from 'axios';

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
                    "https://teasy-backend.herokuapp.com/todos/all",
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
        <div className="App">
            <header>
                <h1>
                       Todo List
                </h1>
            </header>
            <TodoForm todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} />
            <TodoList todos={todos} setTodos={setTodos}/>
        </div>
    )
};

export default Main;