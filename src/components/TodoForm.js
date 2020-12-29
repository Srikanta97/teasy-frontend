import React,{useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';

const TodoForm = ({ todos, setTodos, inputText, setInputText }) => {
    let [id, setId] = useState("");
    let [title, setTitle] = useState("");
    let [completed, setCompleted] = useState(false);
    const [error, setError] = useState("");
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const submitTodoHandler = async (e) => {
        e.preventDefault();
        setId(id=uuidv4());
        setTitle(title=inputText);
        try {
            const todo = { title, id, completed };
            console.log(todo);
            await Axios.post(
                "https://teasy-backend.herokuapp.com/todos/",
                todo,
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
        setTodos([
            ...todos,{
                title: inputText,
                id,
                completed
            }
        ]) : setInputText("") ;
        setInputText("");
    }
    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
    )
}

export default TodoForm;