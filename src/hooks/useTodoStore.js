import { useState, useEffect } from 'react';
import TodoRepository from '../api/repositories/TodoRepository';
const useTodoStore = () => {
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);

    const loadTodos = async () => {
        try {
            setLoading(true);
            const todoList = await TodoRepository.getAllTodos();
            setTodos(todoList);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadTodos();
    }, []);

    return { todos, loading, setTodos };
};

export default useTodoStore;
