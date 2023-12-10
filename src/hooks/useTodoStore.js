import { useState, useEffect, useCallback } from 'react';
import TodoRepository from '../api/repositories/TodoRepository';


const useTodoStore = () => {
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [todos, setTodos] = useState([]);

    const loadTodos = async () => {
        try {
            setLoading(true);
            const todoList = await TodoRepository.getAllTodos();
            setTodos(todoList);
            setFetched(true);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);


    return { todos, loading, fetched, setTodos, };
};

export default useTodoStore;
