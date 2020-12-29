import React from 'react';
import Axios from 'axios';

const Todo = ({ title, todo, todos, setTodos }) => {

    const deleteTodoHandler = async (e) => {
        e.preventDefault();
        try {
            await Axios.delete(
                `http://localhost:5000/todos/${todo.id}`,
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
        setTodos(todos.filter(ele => (
            ele.id !== todo.id
        ))
        );
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await Axios.put(
                `http://localhost:5000/todos/${todo.id}`, null,
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
            console.log(err.response.data.msg);
        }
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    completed: true
                }
            }
            return item;
        }))
    }
    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{title}</li>
            <button onClick={updateHandler} className="complete-btn"><i className="fas fa-check"></i></button>
            <button onClick={deleteTodoHandler} className="trash-btn"><i className="fas fa-trash"></i></button>       
        </div>
    )
}

export default Todo;